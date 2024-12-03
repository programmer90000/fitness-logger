import React from "react";
import { StyleSheet, View } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from "react-native-reanimated-table";
import LineChartComponent from "../../components/line-graph/line-graph";
import { useSettings } from "../settings/settings.js";

styles = StyleSheet.create({
    "container": { "flex": 1, "padding": 16, "paddingTop": 30, "backgroundColor": "#fff" },
    "head": { "height": 40, "backgroundColor": "#f1f8ff" },
    "wrapper": { "flexDirection": "row" },
    "title": { "flex": 1, "backgroundColor": "#f6f8fa" },
    "row": { "height": 28 },
    "text": { "textAlign": "center" },
});

const Statistics = () => {
    const { theme } = useSettings();

    const tableHead = ["", "Head1", "Head2", "Head3"];
    const tableTitle = ["Title", "Title2", "Title3", "Title4"];
    const tableData = [
        ["1", "2", "3"],
        ["a", "b", "c"],
        ["1", "2", "3"],
        ["a", "b", "c"],
    ];

    return (
        <View style = {styles.container}>
            <Table borderStyle = {{ "borderWidth": 1 }}>
                <Row data = {tableHead} flexArr = {[1, 2, 1, 1]} style = {styles.head} textStyle = {styles.text}/>
                <TableWrapper style = {styles.wrapper}>
                    <Col data = {tableTitle} style = {styles.title} heightArr = {[28, 28]} textStyle = {styles.text}/>
                    <Rows data = {tableData} flexArr = {[2, 1, 1]} style = {styles.row} textStyle = {styles.text}/>
                </TableWrapper>
            </Table>
        </View>
    );
};

export default Statistics;
