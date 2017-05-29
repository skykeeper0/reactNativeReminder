import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    dueDateText: {
        color: 'red',
        flex: 1,
        fontSize: 12,
        paddingTop: 6,
        textAlign: 'right'
    },
    taskNameText: {
        fontSize: 20
    },
    tasksListCellContainer: {
        flex: 1
    },
    tasksListCellTextRow: {
        flexDirection: 'row',
        flex: 1
    }
})

export default styles;