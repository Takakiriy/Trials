from reportlab.pdfgen import canvas  #// pip(env) install reportlab
from reportlab.lib.pagesizes import A4, portrait
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
import webbrowser

file_name = '2_Japanese.pdf'
pdf = canvas.Canvas(file_name, pagesize=portrait(A4))

if False:
    font_name = 'GenShinGothic'
    font_path = './fonts/GenShinGothic-P-Regular.ttf'
    font_size = 12
    pdfmetrics.registerFont(TTFont(font_name, font_path))
    pdf.setFont(font_name, font_size)
else:
    font_name = 'HeiseiMin-W3'  #// 組み込みのフォント。少し崩れる
    font_size = 12
    pdfmetrics.registerFont(UnicodeCIDFont(font_name))
    pdf.setFont(font_name, font_size)

pdf.drawString(100, 500, "Hello World ハローワールド")
pdf.showPage()
pdf.save()

webbrowser.open(file_name)