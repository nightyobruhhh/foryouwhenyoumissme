"""Create trimmed, transparent PNG copies of the letter and sticker assets."""

from __future__ import annotations

from collections import deque
from pathlib import Path
from typing import Callable

from PIL import Image, ImageFilter, ImageChops


PROJECT_ROOT = Path(__file__).resolve().parent
ASSET_DIR = PROJECT_ROOT / "assets" / "images"
if not ASSET_DIR.is_dir():
    ASSET_DIR = PROJECT_ROOT

ASSETS = {
    "spacer": ("spacer.jpg", "spacer.jpg.jpg"),
    "env-pink": ("env-pink.jpg", "env-pink.jpg.jpg"),
    "env-blue": ("env-blue.jpg", "env-blue.jpg.jpg"),
    "env-red": ("env-red.jpg", "env-red.jpg.jpg"),
    "env-gold": ("env-gold.jpg", "env-gold.jpg.jpg"),
    "cat": ("cat.png.png", "cat.png"),
}

ImageProcessor = Callable[[Image.Image], Image.Image]


def find_source(name: str, candidates: tuple[str, ...]) -> Path:
    for filename in candidates:
        path = ASSET_DIR / filename
        if path.is_file():
            return path
    expected = ", ".join(candidates)
    raise FileNotFoundError(f"Missing source for {name}; expected one of: {expected}")


def pillow_background_removal(image: Image.Image) -> Image.Image:
    """Remove only light, corner-connected background and softly feather its edge."""
    rgba = image.convert("RGBA")
    original_alpha = rgba.getchannel("A")
    rgb = rgba.convert("RGB")
    width, height = rgb.size
    pixels = rgb.load()
    removable = bytearray(width * height)
    corners = ((0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1))
    background_colors = [pixels[x, y] for x, y in corners]

    def is_background(x: int, y: int) -> bool:
        red, green, blue = pixels[x, y]
        brightness = (red + green + blue) // 3
        chroma = max(red, green, blue) - min(red, green, blue)
        close_to_corner = any(
            max(abs(red - sample[0]), abs(green - sample[1]), abs(blue - sample[2])) <= 18
            for sample in background_colors
        )
        return brightness >= 190 and chroma <= 48 and close_to_corner

    visited = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()
    for point in corners:
        x, y = point
        if is_background(x, y) and not visited[y * width + x]:
            visited[y * width + x] = 1
            queue.append(point)

    while queue:
        x, y = queue.popleft()
        removable[y * width + x] = 255
        for next_x, next_y in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= next_x < width and 0 <= next_y < height:
                position = next_y * width + next_x
                if not visited[position] and is_background(next_x, next_y):
                    visited[position] = 1
                    queue.append((next_x, next_y))

    background_mask = Image.frombytes("L", (width, height), bytes(removable))
    feathered_mask = background_mask.filter(ImageFilter.GaussianBlur(radius=0.8))
    keep_alpha = ImageChops.invert(feathered_mask)
    rgba.putalpha(ImageChops.multiply(original_alpha, keep_alpha))
    return rgba


def make_rembg_processor() -> ImageProcessor | None:
    try:
        from rembg import new_session, remove

        session = new_session("u2net")
        return lambda image: remove(image, session=session, post_process_mask=True).convert("RGBA")
    except Exception as error:
        print(f"rembg unavailable ({error}); using the Pillow corner flood-fill.")
        return None


def trim_transparent_padding(image: Image.Image) -> Image.Image:
    alpha = image.getchannel("A")
    bounds = alpha.getbbox()
    if bounds is None:
        raise ValueError("Background removal made the whole image transparent.")
    return image.crop(bounds)


def main() -> None:
    processor = make_rembg_processor()

    for output_name, candidates in ASSETS.items():
        source_path = find_source(output_name, candidates)
        output_path = ASSET_DIR / f"{output_name}.png"
        with Image.open(source_path) as source:
            source.load()
            try:
                converted = processor(source.copy()) if processor else pillow_background_removal(source)
                if processor:
                    bounds = converted.getchannel("A").getbbox()
                    if bounds is None or (bounds[2] - bounds[0]) * (bounds[3] - bounds[1]) < source.width * source.height * 0.15:
                        print(f"rembg kept too little of {source_path.name}; using Pillow.")
                        converted = pillow_background_removal(source)
            except Exception as error:
                print(f"rembg failed for {source_path.name} ({error}); using Pillow.")
                converted = pillow_background_removal(source)

        converted = trim_transparent_padding(converted)
        converted.save(output_path, "PNG", optimize=True)
        print(f"{source_path.name} -> {output_path.name} ({converted.width} x {converted.height})")


if __name__ == "__main__":
    main()
