import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
//import { Button } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'; // Importa el contexto de autenticación
import backgroundImage from '../../../public/assets/fondocerti.jpg'; // Asegúrate que la ruta sea correcta

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    zIndex: 1, // Asegura que el texto esté encima de la imagen
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

const GradesPDF = () => {
  const [grades, setGrades] = React.useState([]);
  const { user, token } = useAuth(); // Extraer el número de cuenta desde el contexto de autenticación

  React.useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`api/student/certificacion${user.numeroCuenta}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, [user.numeroCuenta, token]); // Se asegura que se actualice si el número de cuenta o token cambian

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={backgroundImage} style={styles.backgroundImage} />
        <View style={styles.section}>
          <Text>Certificación de Calificaciones</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Código</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Asignatura</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Calificación</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>UV</Text>
              </View>
            </View>
            {grades.map((grade) => (
              <View style={styles.tableRow} key={grade.id_CR}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{grade.Asignaturas.codigo}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{grade.Asignaturas.nombre}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{grade.nota}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{grade.Asignaturas.uv}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={MyDocument} fileName="certificacion.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Generando PDF...' : 'Descargar Certificación'
      }
    </PDFDownloadLink>
  );
};

export default GradesPDF;
