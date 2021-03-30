from reportlab.pdfgen import canvas  #// pip(env) install reportlab
from reportlab.lib.pagesizes import A4, portrait
from PIL import Image  #// pip(env) install pillow
import webbrowser

file_name = '4_image.pdf'
pdf = canvas.Canvas(file_name, pagesize=portrait(A4))

image = Image.open('./image/pose_reiwa_man.png')
pdf.drawInlineImage( image, 100, 400 )
pdf.line( 0, 0, 100, 400 )
pdf.showPage()
pdf.save()

webbrowser.open(file_name)
