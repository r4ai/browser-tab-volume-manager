import cairosvg
from PIL import Image
from io import BytesIO

def convert_svg_to_png(svg_file_path, output_file_prefix, sizes=[16, 32, 48, 128]):
    # SVGファイルを読み込み
    with open(svg_file_path, 'rb') as svg_file:
        svg_data = svg_file.read()

    # 各サイズに対して変換
    for size in sizes:
        # SVGをPNG形式のデータに変換
        png_data = BytesIO()
        cairosvg.svg2png(bytestring=svg_data, write_to=png_data, output_width=size, output_height=size)

        # PNGデータをPIL Imageオブジェクトに変換
        png_data.seek(0)
        img = Image.open(png_data)

        # PIL Imageオブジェクトをファイルに保存
        output_file_path = f"{output_file_prefix}_{size}.png"
        img.save(output_file_path, 'PNG')

# 使用例
target_folder = '../public/images'
convert_svg_to_png(f'{target_folder}/speaker_high_volume_color.svg', f'{target_folder}/extension')
