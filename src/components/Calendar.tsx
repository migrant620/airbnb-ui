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
export const Calendar = ({ year, months, range, onSelect, today, }: {
    year: number;
    months: number[];
    range: DayRange;
    onSelect: (d: Date) => void;
    today: Date;
}) => (<View>
    {months.map((m, mi) => {
        const cells = monthCells(year, m);
        const firstDow = new Date(year, m, 1).getDay();
        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const cut = (year === today.getFullYear() && m === today.getMonth() && weekStart.getMonth() === m)
            ? firstDow + weekStart.getDate() - 1
            : 0;
        const shown = cells.slice(cut);
        return (<View key={m} style={styles.month}>
          {cut > 0 ? (<View style={styles.titleFold}>
              <Text aria-hidden style={styles.monthTitle}>{MONTHS[m]} {year}</Text>
            </View>) : (<Text aria-hidden style={styles.monthTitle}>{MONTHS[m]} {year}</Text>)}
          {mi === 0 ? (<View style={styles.dowRow}>
              {DOW.map((d, i) => (<Text key={i} aria-hidden style={styles.dow}>{d}</Text>))}
            </View>) : null}
          <View style={styles.grid}>
            {shown.map((d, i) => {
                if (d == null)
                    return <View key={i} style={styles.cell}/>;
                const date = new Date(year, m, d);
                const past = date < today && !sameDay(date, today);
                const isStart = range.start && sameDay(range.start, date);
                const isEnd = range.end && sameDay(range.end, date);
                const inRange = range.start && range.end &&
                    date > range.start && date < range.end;
                const sel = isStart || isEnd;
                return (<TouchableOpacity key={i} accessibilityRole="button" accessibilityLabel={`${MONTHS[m]} ${d}`} onPress={() => { if (!past)
                    onSelect(date); }} disabled={past} style={[
                        styles.cell,
                        inRange && styles.cellRange,
                        sel && styles.cellSelected,
                    ]}>
                  <Text aria-hidden style={past ? styles.dayPast : sel ? styles.daySel : styles.day}>{d}</Text>
                </TouchableOpacity>);
            })}
          </View>
        </View>);
    })}
  </View>);
const CELL_W = 45.57;
const styles = StyleSheet.create({
    month: { marginBottom: 0 },
    titleFold: { height: 0, overflow: 'hidden' },
    monthTitle: { fontFamily: 'PJS', fontSize: 16, lineHeight: 22, fontWeight: '700' as const, color: colors.ink, marginBottom: 8 },
    dowRow: { flexDirection: 'row' },
    dow: { width: CELL_W, textAlign: 'center', fontSize: 12, lineHeight: 16, color: colors.secondary },
    grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 6 },
    cell: { width: CELL_W, height: 44, alignItems: 'center', justifyContent: 'center' },
    cellRange: { backgroundColor: '#F2F2F2' },
    cellSelected: { backgroundColor: colors.ink, borderRadius: 20 },
    day: { fontFamily: 'PJS', fontSize: 14, color: colors.ink },
    dayPast: {
        fontFamily: 'PJS', fontSize: 14, color: '#8C8C8C',
        textDecorationLine: 'line-through', textDecorationColor: '#8C8C8C',
    },
    daySel: { fontFamily: 'PJS', fontSize: 14, fontWeight: '700' as const, color: colors.white },
});
