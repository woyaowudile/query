const LICENCE = '3E68261B-3A3D-88E6-E903-B0C327D49AA4';

export function getUrl(code, type = 'Day_qfq') {
    return `http://ig507.com/data/time/history/trade/${code}/Day_qfq?licence=${LICENCE}`;
}

export const CODELIST = ['000003'];
