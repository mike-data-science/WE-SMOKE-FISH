import sys
try:
    from PIL import Image
    import collections

    def get_dominant_color(image_path):
        img = Image.open(image_path)
        img = img.convert("RGB")
        img.thumbnail((100, 100))
        
        pixels = list(img.getdata())
        counts = collections.Counter(pixels)
        dominant = counts.most_common(1)[0][0]
        return '#%02x%02x%02x' % dominant

    print("images.png:", get_dominant_color("c:/Users/Mike/Desktop/wesmokefish/images.png"))
    print("images (3).jpg:", get_dominant_color("c:/Users/Mike/Desktop/wesmokefish/images (3).jpg"))
except Exception as e:
    print("Error:", e)
