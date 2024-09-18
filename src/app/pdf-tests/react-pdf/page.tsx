'use client'
import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, PDFViewer, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Define los datos
const data = [
  { 
    start_date: (new Date(Date.now())).toLocaleDateString('es-ES'),
    client: 'Cliente A',
    currency: 1, 
    total: 100,
    name_seller: 'Vendedor A',
    branch: 'Sucursal A',
    status: true
  },
  { 
    start_date: (new Date(Date.now())).toLocaleDateString('es-ES'),
    client: 'Cliente B',
    currency: 2, 
    total: 150,
    name_seller: 'Vendedor B',
    branch: 'Sucursal B',
    status: false
  },
  { 
    start_date: (new Date(Date.now())).toLocaleDateString('es-ES'),
    client: 'Cliente C',
    currency: 3, 
    total: 200,
    name_seller: 'Vendedor C',
    branch: 'Sucursal C',
    status: true
  },
];

// Define estilos
const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  section: {
    marginBottom: 20,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "14.28%", // 100% dividido entre 7 columnas
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
  },
  tableCellHeader: {
    backgroundColor: "#6610f2",
    fontWeight: "bold", // Texto en negrita
    color: "#ffffff", // Color del texto (blanco
  },
  tableCell: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20, // Añade un margen inferior al encabezado de 20 unidades para separarlo del contenido.
    flexDirection: 'row', // Alinea los elementos del encabezado en una fila horizontal.
    justifyContent: 'space-between', // Distribuye los elementos del encabezado de manera uniforme a lo largo de la fila (espacio entre el logo y la tabla de información).
    alignItems: 'center', // Alinea los elementos verticalmente al centro de la fila.
  },
  logo: {
    width: 220,
    height: 70,
  },
  tableContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    width: "auto",
  },
  tableCellSingle: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
    textAlign: "center",
  },
  tableHeaderCell: {
    backgroundColor: "#6610f2", // Color de fondo morado
    fontWeight: "bold", // Texto en negrita
    color: "#ffffff", // Color del texto (blanco en este caso)
    fontFamily: "Comic Sans MS", // Cambiar a Comic Sans
    
  },
});
console.log("VA")
// Define estilos específicos para la tabla en la cabecera
const headerStyles = StyleSheet.create({
  headerTable: {
    marginTop: 20, // Margen superior para separar de otros elementos
    marginBottom: 20, // Margen inferior para separar de otros elementos
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    width: 150, // Ancho completo de la página
    flexDirection: 'column', // Las filas se alinean verticalmente
  },
  headerTableRow: {
    flexDirection: 'row', // Las celdas se alinean horizontalmente dentro de cada fila
  },
  headerTableCol: {
    width: 150, // Ancho completo de la columna
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 8, // Relleno interno para las celdas, reducido un poco
  },
  headerTableCellHeader: {
    backgroundColor: '#f2f2f2', // Color de fondo
    fontWeight: 'bold', // Negrita para el texto
    textAlign: 'center', // Alineación centrada del texto
    fontSize: 10, // Cambia el tamaño de la fuente aquí
    fontFamily: 'Helvetica', // Cambia la fuente aquí
  },
  headerTableCell: {
    textAlign: 'center', // Alineación centrada del texto
    fontSize: 10, // Tamaño de fuente reducido
  },
});



// Define la interfaz para los datos
interface DataItem {
  start_date: string;
  client: string;
  currency: number;
  total: number;
  name_seller: string;
  branch: string;
  status: boolean;
}

// Documento PDF con una tabla que recibe datos como props
const MyDocument: React.FC<{ data: DataItem[] }> = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image
          src="https://storage.googleapis.com/flutterflow-io-6f20.appspot.com/projects/e-r-p-10x-btg6z4/assets/jt6khkb866ic/10x.png"
          style={styles.logo}
        />


        {/* Tabla en la cabecera */}
      <View style={headerStyles.headerTable}>
        <View style={headerStyles.headerTableRow}>
          <View style={headerStyles.headerTableCol}>
            <Text style={headerStyles.headerTableCellHeader}>Información de la Empresa</Text>
          </View>
        </View>
        <View style={headerStyles.headerTableRow}>
          <View style={headerStyles.headerTableCol}>
            <Text style={headerStyles.headerTableCell}>Nombre de la Empresa</Text>
          </View>
        </View>
      </View>
        
      </View>
      
      {/* <View style={styles.tableContainer}> */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.tableCellHeader]}>
              <Text style={styles.tableCell}>Fecha de Inicio</Text>
            </View>
            <View style={[styles.tableCol, styles.tableCellHeader]}>
              <Text style={styles.tableCell}>Cliente</Text>
            </View>
            <View style={[styles.tableCol, styles.tableCellHeader]}>
              <Text style={styles.tableCell}>Moneda</Text>
            </View>
            <View style={[styles.tableCol, styles.tableCellHeader]}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
            <View style={[styles.tableCol, styles.tableCellHeader]}>
              <Text style={styles.tableCell}>Vendedor</Text>
            </View>
            <View style={[styles.tableCol, styles.tableCellHeader]}>
              <Text style={styles.tableCell}>Sucursal</Text>
            </View>
            <View style={[styles.tableCol, styles.tableCellHeader]}>
              <Text style={styles.tableCell}>Estado</Text>
            </View>
          </View>
          {data.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.start_date}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.client}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.currency}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.total}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.name_seller}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.branch}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.status ? 'Activo' : 'Inactivo'}</Text>
              </View>
            </View>
          ))}
        </View>
      {/* </View> */}
    </Page>
  </Document>
);

const PDFPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Solo ejecuta en el cliente
  }, []);

  return (
    <div className="pdf-container">
      <h1 className="text-2xl mb-4">Generar y Visualizar PDF con Tabla</h1>

      {/* Visualización del PDF en el navegador */}
      {isClient && (
        <div style={{ marginBottom: '20px', border: '1px solid #bfbfbf' }}>
          <PDFViewer width="100%" height="600">
            <MyDocument data={data} />
          </PDFViewer>
        </div>
      )}

      {/* Botón para descargar el PDF */}
      {isClient && (
        <PDFDownloadLink
          document={<MyDocument data={data} />}
          fileName="Reporte.pdf"
          className="btn btn-primary"
        >
          {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default PDFPage;





// 'use client'
// import React, { useEffect, useState } from 'react';
// import { PDFDownloadLink, PDFViewer, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// // Definir estilos para el PDF
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   table: {
//     width: "auto",
//     borderStyle: "solid",
//     borderWidth: 0,
//     borderColor: "#bfbfbf",
//     marginBottom: 10,
//   },
//   tableRow: {
//     flexDirection: "row",
//   },
//   tableCol: {
//     width: "25%",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderColor: "#bfbfbf",
//     padding: 5,
//   },
//   tableCellHeader: {
//     backgroundColor: "#f2f2f2",
//     fontWeight: "bold",
//   },
//   tableCell: {
//     textAlign: "center",
//     fontSize: 10,
//   },
//   header: {
//     marginBottom: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 150,  // Ajusta el tamaño de la imagen según sea necesario
//     height: 50,  // Ajusta el tamaño de la imagen según sea necesario
//   },
//   tableContainer: {
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderColor: "#bfbfbf",
//     width: "auto",
//   },
//   tableCellSingle: {
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderColor: "#bfbfbf",
//     padding: 5,
//     textAlign: "center",
//   },
//   tableHeaderCell: {
//     fontWeight: "bold",
//   },
// });

// const MyDocument = () => (
//   <Document>
//     <Page style={styles.page}>
//       <View style={styles.header}>
//         <Image
//           src="https://storage.googleapis.com/flutterflow-io-6f20.appspot.com/projects/e-r-p-10x-btg6z4/assets/jt6khkb866ic/10x.png"
//           style={styles.logo}
//         />
//         <View style={styles.tableContainer}>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCellSingle}>
//               <Text style={styles.tableHeaderCell}>Empresa</Text>
//             </View>
//           </View>
//           <View style={styles.tableRow}>
//             <View style={styles.tableCellSingle}>
//               <Text>Nombre de la Empresa</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//       <View style={styles.section}>
//         <Text>Reporte de Datos</Text>
//       </View>
//       <View style={styles.table}>
//         <View style={styles.tableRow}>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text style={styles.tableCell}>Código</Text>
//           </View>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text style={styles.tableCell}>Columna 2</Text>
//           </View>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text style={styles.tableCell}>Columna 3</Text>
//           </View>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text style={styles.tableCell}>Columna 4</Text>
//           </View>
//         </View>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <View style={styles.tableRow} key={index}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Dato {index + 1} - 1</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Dato {index + 1} - 2</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Dato {index + 1} - 3</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Dato {index + 1} - 4</Text>
//             </View>
//           </View>
//         ))}
//       </View>
//     </Page>
//   </Document>
// );

// const PDFPage: React.FC = () => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); // Solo ejecuta en el cliente
//   }, []);

//   return (
//     <div className="pdf-container">
//       <h1 className="text-2xl mb-4">Generar y Visualizar PDF con Tabla</h1>

//       {/* Visualización del PDF en el navegador */}
//       {isClient && (
//         <div style={{ marginBottom: '20px', border: '1px solid #bfbfbf' }}>
//           <PDFViewer width="100%" height="600">
//             <MyDocument />
//           </PDFViewer>
//         </div>
//       )}

//       {/* Botón para descargar el PDF */}
//       {isClient && (
//         <PDFDownloadLink
//           document={<MyDocument />}
//           fileName="Usando react-pdf.pdf"
//           className="btn btn-primary"
//         >
//           {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
//         </PDFDownloadLink>
//       )}
//     </div>
//   );
// };

// export default PDFPage;



// 'use client'
// import React, { useEffect, useState } from 'react';
// import { PDFDownloadLink, PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// // Definir estilos para el PDF
// const styles = StyleSheet.create({
//   page: {
//     padding: 40,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   table: {
//     width: "auto",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderColor: "#bfbfbf",
//     marginBottom: 10,
//   },
//   tableRow: {
//     flexDirection: "row",
//   },
//   tableCol: {
//     width: "25%",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderColor: "#bfbfbf",
//     padding: 5,
//   },
//   tableCellHeader: {
//     backgroundColor: "#f2f2f2",
//     fontWeight: "bold",
//   },
//   tableCell: {
//     textAlign: "center",
//     fontSize: 10,
//   },
// });

// // Documento PDF con una tabla
// const MyDocument = () => (
//   <Document>
//     <Page style={styles.page}>
//       <View style={styles.section}>
//         <Text>Reporte de Datos</Text>
//       </View>
//       <View style={styles.table}>
//         <View style={styles.tableRow}>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text style={styles.tableCell}>Columna 1</Text>
//           </View>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text style={styles.tableCell}>Columna 2</Text>
//           </View>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text style={styles.tableCell}>Columna 3</Text>
//           </View>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text style={styles.tableCell}>Columna 4</Text>
//           </View>
//         </View>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <View style={styles.tableRow} key={index}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Dato {index + 1} - 1</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Dato {index + 1} - 2</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Dato {index + 1} - 3</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>Dato {index + 1} - 4</Text>
//             </View>
//           </View>
//         ))}
//       </View>
//     </Page>
//   </Document>
// );

// const PDFPage: React.FC = () => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); // Solo ejecuta en el cliente
//   }, []);

//   return (
//     <div className="pdf-container">
//       <h1 className="text-2xl mb-4">Generar y Visualizar PDF con Tabla</h1>

//       {/* Visualización del PDF en el navegador */}
//       {isClient && (
//         <div style={{ marginBottom: '20px', border: '1px solid #bfbfbf' }}>
//           <PDFViewer width="100%" height="600">
//             <MyDocument />
//           </PDFViewer>
//         </div>
//       )}

//       {/* Botón para descargar el PDF */}
//       {isClient && (
//         <PDFDownloadLink
//           document={<MyDocument />}
//           fileName="Usando react-pdf.pdf"
//           className="btn btn-primary"
//         >
//           {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
//         </PDFDownloadLink>
//       )}
//     </div>
//   );
// };

// export default PDFPage;

