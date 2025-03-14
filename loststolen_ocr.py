import sys
import easyocr

def main():
    if len(sys.argv) < 2:
        print("Usage: python loststolen_ocr.py <image_path>")
        return

    image_path = sys.argv[1]
    # 영어와 한국어를 함께 사용 (필요에 따라 옵션 조정)
    reader = easyocr.Reader(['en', 'ko'], gpu=False, verbose=False)
    results = reader.readtext(image_path, detail=0)
    if results:
        print(results[0])
    else:
        print("No text recognized")

if __name__ == '__main__':
    main()
