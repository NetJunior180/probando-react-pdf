'use client'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { useState } from 'react';

export default function Libreria1() {
  const [pdfGenerated, setPdfGenerated] = useState(false);

  async function createPdf() {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    // Títulos de la tabla
    const headers = ['ID', 'Nombre', 'Correo Electrónico', 'Teléfono'];
    const data = [
      ['1', 'Juan Pérez', 'juan@example.com', '123-456-7890'],
      ['2', 'Ana Gómez', 'ana@example.com', '098-765-4321'],
      ['3', 'Luis Fernández', 'luis@example.com', '456-789-0123'],
      ['4', 'Luis Fernández', 'luis@example.com', '456-789-0123'],
      ['5', 'Luis Fernández', 'luis@example.com', '456-789-0123'],
      ['6', 'Luis Fernández', 'luis@example.com', '456-789-0123'],
      ['7', 'Luis Fernández', 'luis@example.com', '456-789-0123'],
      ['8', 'Luis Fernández', 'luis@example.com', '456-789-0123'],
      ['9', 'Luis Fernández', 'luis@example.com', '456-789-0123'],
      ['10', 'Luis Fernández', 'luis@example.com', '456-789-0123'],
      ['11', 'Luis Fernández', 'luis@example.com', '456-789-0123'],
    ];

    // Ajustes de la tabla
    const tableTop = height - 100;
    const tableLeft = 50;
    const cellWidths = [30, 120, 180, 100];  // Ajuste dinámico de ancho de celdas
    const rowHeight = 25;  // Incrementar altura de filas para centrado del texto

    // Dibujar encabezados
    let currentX = tableLeft;
    headers.forEach((header, i) => {
      const textWidth = timesRomanFont.widthOfTextAtSize(header, fontSize);
      const textX = currentX + (cellWidths[i] - textWidth) / 2;
      const textY = tableTop - fontSize;

      // Dibujar el texto centrado
      page.drawText(header, {
        x: textX,
        y: textY,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      // Dibujar bordes de encabezados
      page.drawRectangle({
        x: currentX,  // Usar currentX para asegurar que las columnas estén juntas
        y: tableTop - rowHeight,
        width: cellWidths[i],  // Ancho específico para cada columna
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      currentX += cellWidths[i];  // Mover currentX para la siguiente columna
    });

    // Dibujar datos
    data.forEach((row, rowIndex) => {
      let rowX = tableLeft;  // Restablecer currentX para cada fila
      row.forEach((cell, colIndex) => {
        const textWidth = timesRomanFont.widthOfTextAtSize(cell, fontSize);
        const textX = rowX + (cellWidths[colIndex] - textWidth) / 2;
        const textY = tableTop - (rowIndex + 2) * rowHeight + (rowHeight - fontSize) / 2;

        // Dibujar texto centrado
        page.drawText(cell, {
          x: textX,
          y: textY,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        // Dibujar bordes de datos
        page.drawRectangle({
          x: rowX,  // Usar rowX para asegurarse de que las columnas estén juntas
          y: tableTop - (rowIndex + 2) * rowHeight,
          width: cellWidths[colIndex],  // Ancho específico para cada columna
          height: rowHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });

        rowX += cellWidths[colIndex];  // Mover rowX para la siguiente columna
      });
    });

    const pdfBytes = await pdfDoc.save();

    // Crear un enlace para descargar el PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Usando pdf-lib corregido.pdf';
    link.click();

    // Actualizar el estado para indicar que se ha generado el PDF
    setPdfGenerated(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">Bienvenido a Librería 1</h1>
      <button
        className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onClick={createPdf}
      >
        Generar PDF
      </button>

      {pdfGenerated && <p className="mt-4">PDF generado con éxito!</p>}
    </div>
  );
}



// 'use client'
// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
// import { useState } from 'react';

// export default function Libreria1() {
//   const [pdfGenerated, setPdfGenerated] = useState(false);

//   async function createPdf() {
//     const pdfDoc = await PDFDocument.create();
//     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

//     const page = pdfDoc.addPage();
//     const { width, height } = page.getSize();
//     const fontSize = 12;

//     // Títulos de la tabla
//     const headers = ['ID', 'Nombre', 'Correo Electrónico', 'Teléfono'];
//     const data = [
//       ['1', 'Juan Pérez', 'juan@example.com', '123-456-7890'],
//       ['2', 'Ana Gómez', 'ana@example.com', '098-765-4321'],
//       ['3', 'Luis Fernández', 'luis@example.com', '456-789-0123'],
//     ];

//     // Ajustes de la tabla
//     const cellPadding = 5;
//     const tableTop = height - 100;
//     const tableLeft = 50;
//     const cellWidths = [30, 120, 180, 100];  // Ajuste dinámico de ancho de celdas
//     const rowHeight = 25;  // Incrementar altura de filas para centrado del texto

//     // Dibujar encabezados
//     headers.forEach((header, i) => {
//       const textWidth = timesRomanFont.widthOfTextAtSize(header, fontSize);
//       const textX = tableLeft + i * cellWidths[i] + (cellWidths[i] - textWidth) / 2;
//       const textY = tableTop - fontSize;

//       page.drawText(header, {
//         x: textX,
//         y: textY,
//         size: fontSize,
//         font: timesRomanFont,
//         color: rgb(0, 0, 0),
//       });

//       // Dibujar bordes de encabezados
//       page.drawRectangle({
//         x: tableLeft + i * cellWidths[i],
//         y: tableTop - rowHeight,
//         width: cellWidths[i],
//         height: rowHeight,
//         borderColor: rgb(0, 0, 0),
//         borderWidth: 1,
//       });
//     });

//     // Dibujar datos
//     data.forEach((row, rowIndex) => {
//       row.forEach((cell, colIndex) => {
//         const textWidth = timesRomanFont.widthOfTextAtSize(cell, fontSize);
//         const textX = tableLeft + colIndex * cellWidths[colIndex] + (cellWidths[colIndex] - textWidth) / 2;
//         const textY = tableTop - (rowIndex + 2) * rowHeight + (rowHeight - fontSize) / 2;

//         page.drawText(cell, {
//           x: textX,
//           y: textY,
//           size: fontSize,
//           font: timesRomanFont,
//           color: rgb(0, 0, 0),
//         });

//         // Dibujar bordes de datos
//         page.drawRectangle({
//           x: tableLeft + colIndex * cellWidths[colIndex],
//           y: tableTop - (rowIndex + 2) * rowHeight,
//           width: cellWidths[colIndex],
//           height: rowHeight,
//           borderColor: rgb(0, 0, 0),
//           borderWidth: 1,
//         });
//       });
//     });

//     const pdfBytes = await pdfDoc.save();

//     // Crear un enlace para descargar el PDF
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'Usando pdf-lib mejorado.pdf';
//     link.click();

//     // Actualizar el estado para indicar que se ha generado el PDF
//     setPdfGenerated(true);
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <h1 className="text-2xl mb-4">Bienvenido a Librería 1</h1>
//       <button
//         className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//         onClick={createPdf}
//       >
//         Generar PDF
//       </button>

//       {pdfGenerated && <p className="mt-4">PDF generado con éxito!</p>}
//     </div>
//   );
// }
