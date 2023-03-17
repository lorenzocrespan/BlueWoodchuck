// Import - React 
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

function PDFBlueWoodchuck(props) {

    // Create styles
    const styles = StyleSheet.create({
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        title: {
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center',
        },
        author: {
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 40,
        },
        subtitle: {
            fontSize: 18,
            margin: 12,
        },
        text: {
            margin: 12,
            fontSize: 14,
            textAlign: 'justify',
            fontFamily: 'Times-Roman'
        },
        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: 'center',
            color: 'grey',
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },
    });

    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ BlueWoodchuck, Chain of Custody ~
                </Text>
                <Text style={styles.title}>Report</Text>
                <Text style={styles.author}>{props.id}</Text>

                <Text style={styles.subtitle}>
                    Informazioni generali sul caso
                </Text>
                <Text style={styles.text}>
                    Nome caso: {props.form.caseName}
                </Text>
                <Text style={styles.text}>
                    Numero caso: {props.form.caseNumber}
                </Text>

                <Text style={styles.subtitle}>
                    Informazioni oggetto acquisito
                </Text>
                <Text style={styles.text}>
                    Numero oggetto: {props.form.itemNumber}
                </Text>
                <Text style={styles.text}>
                    Tipologia oggetto: {props.form.evidenceTypeManufacturer}
                </Text>
                <Text style={styles.text}>
                    Descrizione oggetto: {props.form.itemDescription}
                </Text>
                <Text style={styles.text}>
                    Ragioni dell'acquisizione: {props.form.reasonObtained}
                </Text>

                <Text style={styles.subtitle}>
                    Informazioni proprietario oggetto
                </Text>
                <Text style={styles.text}>
                    Proprietario: {props.form.owner}
                </Text>
                <Text style={styles.text}>
                    Tipologia oggetto: {props.form.contentOwnerContactInformation}
                </Text>

                <Text style={styles.subtitle}>
                    Informazioni perito dell'acquisizione
                </Text>
                <Text style={styles.text}>
                    Agente: {props.form.forensicAgent}
                </Text>
                <Text style={styles.text}>
                    Contatti agente: {props.form.forensicAgentContactInformation}
                </Text>
                <Text style={styles.subtitle} break>
                    Catena di custodia
                </Text>
                {
                    props.form.chainOfCustody.map((item, index) => (
                        <View key={index}>
                            <Text style={styles.text}>
                                Data: {item ? new Date(item.timestamp * 1000).toLocaleDateString("it-IT") : "Non disponibile"} ~ {item ? item.timestamp : "Non disponibile"}
                            </Text>
                            <Text style={styles.text}>
                                Commento: {item ? item.reasonForChange : ""}
                            </Text>
                            <Text style={styles.text}>
                                Da: {item ? item.releasedBy : ""}
                            </Text>
                            <Text style={styles.text}>
                                A: {item ? item.receivedBy : ""}
                            </Text>
                        </View>))
                }
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
}
export default PDFBlueWoodchuck;