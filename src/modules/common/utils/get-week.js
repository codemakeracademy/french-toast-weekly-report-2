export function getWeek(d) {
    const date = new Date(d);
    const day = date.getDay();
    const monday = date.getDate() - day + (day == 0 ? -6 : 1);
    const sunday = date.getDate() - day + (day == 0 ? 1 : 7);
    return {
        monday: new Date(date.setDate(monday)),
        sunday: new Date(date.setDate(sunday)),
    };
}

export function slashedDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
}

export function slashedWeek({ monday, sunday }) {
    const first = slashedDate(monday);
    const last = slashedDate(sunday);
    return `${first} - ${last}`;
}

export function weeklyLabel(d) {
    const currentWeekDuration = getWeek(d);
    const previousWeekDuration = getWeek(new Date().setDate(d.getDate() - 7));
    const currentWeek = slashedWeek(currentWeekDuration);
    const previousWeek = slashedWeek(previousWeekDuration);
    return { currentWeek, previousWeek };
}

// Example of work:
// 2021-12-21 => "20/12 - 26/12, 2021"
export function getFormattedWeek(dateStart) {
    const { monday, sunday } = getWeek(dateStart);
    const weekSlashed = slashedWeek({ monday: monday, sunday: sunday });
    const dateYear = new Date(dateStart).getFullYear();
    return weekSlashed + ', ' + dateYear;
}
