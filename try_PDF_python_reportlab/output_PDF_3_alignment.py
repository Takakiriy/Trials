from reportlab.pdfgen import canvas  #// pip(env) install reportlab
from reportlab.lib.pagesizes import A4, portrait
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import webbrowser

file_name = '3_alignment.pdf'
pdf = canvas.Canvas(file_name, pagesize=portrait(A4))

font_name = 'GenShinGothic'
font_path = './fonts/GenShinGothic-P-Regular.ttf'
font_size = 12
pdfmetrics.registerFont(TTFont(font_name, font_path))
pdf.setFont(font_name, font_size)

pdf.drawString(200, 500, "Hello World ハローワールド")
pdf.drawCentredString(200, 450, "Hello World ハローワールド")
pdf.drawRightString(200, 400, "Hello World ハローワールド")
pdf.line(200, 300, 200, 600)
pdf.showPage()
pdf.save()

webbrowser.open(file_name)
