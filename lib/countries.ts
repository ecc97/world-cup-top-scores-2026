// Mapa de países: nationality (inglés) → datos para UI
// Cubre los 48 países del Mundial 2026 + fallback sensible

export interface CountryInfo {
    nameEs: string;
    countryCode: string; // Para flagcdn.com (ej: "fr", "gb-eng")
    flag: string;
    color: string; // Color primario hex
}

export const COUNTRIES: Record<string, CountryInfo> = {
    // UEFA
    France: { nameEs: 'Francia', countryCode: 'fr', flag: '🇫🇷', color: '#002395' },
    England: { nameEs: 'Inglaterra', countryCode: 'gb-eng', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#CF081F' },
    Spain: { nameEs: 'España', countryCode: 'es', flag: '🇪🇸', color: '#AA151B' },
    Germany: { nameEs: 'Alemania', countryCode: 'de', flag: '🇩🇪', color: '#000000' },
    Portugal: { nameEs: 'Portugal', countryCode: 'pt', flag: '🇵🇹', color: '#006600' },
    Netherlands: { nameEs: 'Países Bajos', countryCode: 'nl', flag: '🇳🇱', color: '#FF6600' },
    Belgium: { nameEs: 'Bélgica', countryCode: 'be', flag: '🇧🇪', color: '#DA291C' },
    Italy: { nameEs: 'Italia', countryCode: 'it', flag: '🇮🇹', color: '#0066CC' },
    Croatia: { nameEs: 'Croacia', countryCode: 'hr', flag: '🇭🇷', color: '#FF0000' },
    Scotland: { nameEs: 'Escocia', countryCode: 'gb-sct', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: '#005EB8' },
    Wales: { nameEs: 'Gales', countryCode: 'gb-wls', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', color: '#00AB37' },
    Denmark: { nameEs: 'Dinamarca', countryCode: 'dk', flag: '🇩🇰', color: '#C60C30' },
    Switzerland: { nameEs: 'Suiza', countryCode: 'ch', flag: '🇨🇭', color: '#FF0000' },
    Serbia: { nameEs: 'Serbia', countryCode: 'rs', flag: '🇷🇸', color: '#C6363C' },
    Austria: { nameEs: 'Austria', countryCode: 'at', flag: '🇦🇹', color: '#ED2939' },
    Poland: { nameEs: 'Polonia', countryCode: 'pl', flag: '🇵🇱', color: '#DC143C' },
    Ukraine: { nameEs: 'Ucrania', countryCode: 'ua', flag: '🇺🇦', color: '#0057B7' },
    Turkey: { nameEs: 'Turquía', countryCode: 'tr', flag: '🇹🇷', color: '#E30A17' },
    Czechia: { nameEs: 'Chequia', countryCode: 'cz', flag: '🇨🇿', color: '#D7141A' },
    Hungary: { nameEs: 'Hungría', countryCode: 'hu', flag: '🇭🇺', color: '#CE2939' },
    Romania: { nameEs: 'Rumania', countryCode: 'ro', flag: '🇷🇴', color: '#002B7F' },
    Norway: { nameEs: 'Noruega', countryCode: 'no', flag: '🇳🇴', color: '#BA0C2F' },
    Sweden: { nameEs: 'Suecia', countryCode: 'se', flag: '🇸🇪', color: '#006AA7' },
    Slovakia: { nameEs: 'Eslovaquia', countryCode: 'sk', flag: '🇸🇰', color: '#0B4EA2' },

    // CONMEBOL
    Argentina: { nameEs: 'Argentina', countryCode: 'ar', flag: '🇦🇷', color: '#75AADB' },
    Brazil: { nameEs: 'Brasil', countryCode: 'br', flag: '🇧🇷', color: '#009C3B' },
    Uruguay: { nameEs: 'Uruguay', countryCode: 'uy', flag: '🇺🇾', color: '#0038A8' },
    Colombia: { nameEs: 'Colombia', countryCode: 'co', flag: '🇨🇴', color: '#FCD116' },
    Ecuador: { nameEs: 'Ecuador', countryCode: 'ec', flag: '🇪🇨', color: '#FFD100' },
    Paraguay: { nameEs: 'Paraguay', countryCode: 'py', flag: '🇵🇾', color: '#D52B1E' },
    Chile: { nameEs: 'Chile', countryCode: 'cl', flag: '🇨🇱', color: '#D52B1E' },
    Bolivia: { nameEs: 'Bolivia', countryCode: 'bo', flag: '🇧🇴', color: '#007A33' },
    Venezuela: { nameEs: 'Venezuela', countryCode: 've', flag: '🇻🇪', color: '#CF142B' },
    Peru: { nameEs: 'Perú', countryCode: 'pe', flag: '🇵🇪', color: '#D91023' },

    // CONCACAF
    'United States': { nameEs: 'Estados Unidos', countryCode: 'us', flag: '🇺🇸', color: '#3C3B6E' },
    USA: { nameEs: 'Estados Unidos', countryCode: 'us', flag: '🇺🇸', color: '#3C3B6E' },
    Mexico: { nameEs: 'México', countryCode: 'mx', flag: '🇲🇽', color: '#006847' },
    Canada: { nameEs: 'Canadá', countryCode: 'ca', flag: '🇨🇦', color: '#FF0000' },
    'Costa Rica': { nameEs: 'Costa Rica', countryCode: 'cr', flag: '🇨🇷', color: '#002B7F' },
    Jamaica: { nameEs: 'Jamaica', countryCode: 'jm', flag: '🇯🇲', color: '#009B3A' },
    Honduras: { nameEs: 'Honduras', countryCode: 'hn', flag: '🇭🇳', color: '#00BCE4' },
    Panama: { nameEs: 'Panamá', countryCode: 'pa', flag: '🇵🇦', color: '#D21034' },
    'El Salvador': { nameEs: 'El Salvador', countryCode: 'sv', flag: '🇸🇻', color: '#0047AB' },
    Haiti: { nameEs: 'Haití', countryCode: 'ht', flag: '🇭🇹', color: '#00209F' },
    'Trinidad and Tobago': { nameEs: 'Trinidad y Tobago', countryCode: 'tt', flag: '🇹🇹', color: '#CE1126' },
    Cuba: { nameEs: 'Cuba', countryCode: 'cu', flag: '🇨🇺', color: '#002A8F' },
    Guatemala: { nameEs: 'Guatemala', countryCode: 'gt', flag: '🇬🇹', color: '#4997D0' },

    // AFC
    Japan: { nameEs: 'Japón', countryCode: 'jp', flag: '🇯🇵', color: '#003399' },
    'South Korea': { nameEs: 'Corea del Sur', countryCode: 'kr', flag: '🇰🇷', color: '#003478' },
    'Korea Republic': { nameEs: 'Corea del Sur', countryCode: 'kr', flag: '🇰🇷', color: '#003478' },
    Iran: { nameEs: 'Irán', countryCode: 'ir', flag: '🇮🇷', color: '#239F40' },
    'Saudi Arabia': { nameEs: 'Arabia Saudita', countryCode: 'sa', flag: '🇸🇦', color: '#006C35' },
    Australia: { nameEs: 'Australia', countryCode: 'au', flag: '🇦🇺', color: '#00843D' },
    Qatar: { nameEs: 'Catar', countryCode: 'qa', flag: '🇶🇦', color: '#8D1B3D' },
    Iraq: { nameEs: 'Irak', countryCode: 'iq', flag: '🇮🇶', color: '#007A3D' },
    'United Arab Emirates': { nameEs: 'Emiratos Árabes', countryCode: 'ae', flag: '🇦🇪', color: '#EF3340' },
    Uzbekistan: { nameEs: 'Uzbekistán', countryCode: 'uz', flag: '🇺🇿', color: '#0099B5' },
    Jordan: { nameEs: 'Jordania', countryCode: 'jo', flag: '🇯🇴', color: '#007A3D' },
    China: { nameEs: 'China', countryCode: 'cn', flag: '🇨🇳', color: '#DE2910' },
    Thailand: { nameEs: 'Tailandia', countryCode: 'th', flag: '🇹🇭', color: '#A51931' },
    Indonesia: { nameEs: 'Indonesia', countryCode: 'id', flag: '🇮🇩', color: '#FF0000' },
    Vietnam: { nameEs: 'Vietnam', countryCode: 'vn', flag: '🇻🇳', color: '#DA251D' },

    // CAF
    Morocco: { nameEs: 'Marruecos', countryCode: 'ma', flag: '🇲🇦', color: '#C1272D' },
    Senegal: { nameEs: 'Senegal', countryCode: 'sn', flag: '🇸🇳', color: '#00853F' },
    Nigeria: { nameEs: 'Nigeria', countryCode: 'ng', flag: '🇳🇬', color: '#008751' },
    Egypt: { nameEs: 'Egipto', countryCode: 'eg', flag: '🇪🇬', color: '#CE1126' },
    Cameroon: { nameEs: 'Camerún', countryCode: 'cm', flag: '🇨🇲', color: '#007A5E' },
    Ghana: { nameEs: 'Ghana', countryCode: 'gh', flag: '🇬🇭', color: '#006B3F' },
    Tunisia: { nameEs: 'Túnez', countryCode: 'tn', flag: '🇹🇳', color: '#E70013' },
    Algeria: { nameEs: 'Argelia', countryCode: 'dz', flag: '🇩🇿', color: '#006233' },
    'Ivory Coast': { nameEs: 'Costa de Marfil', countryCode: 'ci', flag: '🇨🇮', color: '#F77F00' },
    'Côte d\'Ivoire': { nameEs: 'Costa de Marfil', countryCode: 'ci', flag: '🇨🇮', color: '#F77F00' },
    'DR Congo': { nameEs: 'RD Congo', countryCode: 'cd', flag: '🇨🇩', color: '#007FFF' },
    'Congo DR': { nameEs: 'RD Congo', countryCode: 'cd', flag: '🇨🇩', color: '#007FFF' },
    Mali: { nameEs: 'Malí', countryCode: 'ml', flag: '🇲🇱', color: '#14B53A' },
    'Burkina Faso': { nameEs: 'Burkina Faso', countryCode: 'bf', flag: '🇧🇫', color: '#009E49' },
    'Cape Verde': { nameEs: 'Cabo Verde', countryCode: 'cv', flag: '🇨🇻', color: '#003893' },
    'South Africa': { nameEs: 'Sudáfrica', countryCode: 'za', flag: '🇿🇦', color: '#007749' },

    // OFC
    'New Zealand': { nameEs: 'Nueva Zelanda', countryCode: 'nz', flag: '🇳🇿', color: '#000000' },
};

// Fallback para países no mapeados
const DEFAULT_COUNTRY: CountryInfo = {
    nameEs: 'Desconocido',
    countryCode: 'xx',
    flag: '🏳️',
    color: '#6B7280',
};

export function getCountryInfo(nationality: string): CountryInfo {
    return COUNTRIES[nationality] ?? DEFAULT_COUNTRY;
}

// Mapea section de football-data.org a posición corta
export function mapSectionToPosition(section: string | null): string {
    switch (section) {
        case 'Offence':
            return 'FWD';
        case 'Midfield':
            return 'MID';
        case 'Defense':
            return 'DEF';
        case 'Goalkeeper':
            return 'GK';
        default:
            return 'FWD'; // Default a delantero para goleadores
    }
}

// Genera iniciales a partir del nombre
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();
}