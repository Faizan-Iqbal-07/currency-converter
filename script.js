const baseUrl = "https://latest.currency-api.pages.dev/v1/currencies"

const dropDowns = document.querySelectorAll(".dropdowns select");
const button = document.querySelector("button");
const from = document.querySelector(".From select");
const to = document.querySelector(".To select");
const msg = document.querySelector(".msg");


const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
};


for (let select of dropDowns) {
    for (let currencyCode in countryList) {
        let newOptions = document.createElement("option")
        newOptions.textContent = currencyCode
        newOptions.value = currencyCode

        if (select.name === "From" && currencyCode === "USD") {
            newOptions.selected = "selected"
        } else if (select.name === "To" && currencyCode === "PKR") {
            newOptions.selected = "selected"
        }

        select.append(newOptions)
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target)
    })
}

const updateFlag = (e) => {
    const currencyCode = e.value;
    const countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = e.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangeRate = async () => {

    const amount = document.querySelector(".amount input ")
    const amountValue = amount.value
    
    if (amountValue === "" || amountValue < 1) {
        msg.textContent = "Please enter a valid amount.";
        return;
    }

    const URL = `${baseUrl}/${from.value.toLowerCase()}.json`
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
        let finalAmount = amountValue * rate
        msg.textContent = `${amountValue} ${from.value} = ${finalAmount.toFixed(2)} ${to.value}`;

    }catch (error) {
        console.log(msg.textContent = "Error fetching exchange rate: " + error.message)
    }

}

button.addEventListener("click", (event) => {
    event.preventDefault()
    updateExchangeRate()
})

window.addEventListener("load", () => {
    updateExchangeRate()
})