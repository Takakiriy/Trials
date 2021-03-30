from reportlab.pdfgen import canvas  #// pip(env) install reportlab
import webbrowser

file_name = '1.pdf'
pdf = canvas.Canvas(file_name)
pdf.drawString(100,500,"Hello World")
pdf.showPage()
pdf.save()

webbrowser.open(file_name)
