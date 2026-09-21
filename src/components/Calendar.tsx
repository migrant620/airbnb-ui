import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, type } from '../tokens';
export type DayRange = {
    start: Date | null;
    end: Date | null;
};
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
function monthCells(year: number, month: number) {
    const first = new Date(year, month, 1);
    const startDow = first.getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < startDow; i++)
        cells.push(null);
    for (let d = 1; d <= days; d++)
        cells.push(d);
    while (cells.length % 7 !== 0)
        cells.push(null);
    return cells;
}
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const Calendar = ({ year, months, range, onSelect, }: {
    year: number;
    months: number[];
    range: DayRange;
    onSelect: (d: Date) => void;
}) => (<View>
    {months.map((m) => {
        const cells = monthCells(year, m);
        return (<View key={m} style={styles.month}>
          <Text aria-hidden style={styles.monthTitle}>{MONTHS[m]} {year}</Text>
          <View style={styles.dowRow}>
            {DOW.map((d, i) => (<Text key={i} aria-hidden style={styles.dow}>{d}</Text>))}
          </View>
          <View style={styles.grid}>
            {cells.map((d, i) => {
                if (d == null)
                    return <View key={i} style={styles.cell}/>;
                const date = new Date(year, m, d);
                const isStart = range.start && sameDay(range.start, date);
                const isEnd = range.end && sameDay(range.end, date);
                const inRange = range.start && range.end &&
                    date > range.start && date < range.end;
                const sel = isStart || isEnd;
                return (<TouchableOpacity key={i} accessibilityRole="button" accessibilityLabel={`${MONTHS[m]} ${d}`} onPress={() => onSelect(date)} style={[
                        styles.cell,
                        inRange && styles.cellRange,
                        sel && styles.cellSelected,
                    ]}>
                  <Text aria-hidden style={sel ? styles.daySel : styles.day}>{d}</Text>
                </TouchableOpacity>);
            })}
          </View>
        </View>);
    })}
  </View>);
const CELL_W = 45.57;
const styles = StyleSheet.create({
    month: { marginBottom: 2 },
    monthTitle: { fontFamily: 'PJS', fontSize: 16, lineHeight: 22, fontWeight: '700' as const, color: colors.ink },
    dowRow: { flexDirection: 'row' },
    dow: { width: CELL_W, textAlign: 'center', fontSize: 12, lineHeight: 16, color: colors.secondary },
    grid: { flexDirection: 'row', flexWrap: 'wrap' },
    cell: { width: CELL_W, height: 30, alignItems: 'center', justifyContent: 'center' },
    cellRange: { backgroundColor: 'rgba(255,56,92,0.12)' },
    cellSelected: { backgroundColor: colors.reserve, borderRadius: 15 },
    day: { fontFamily: 'PJS', fontSize: 14, color: colors.ink },
    daySel: { fontFamily: 'PJS', fontSize: 14, fontWeight: '700' as const, color: colors.white },
});
