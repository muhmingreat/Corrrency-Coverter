// fetching the symbol data (currncy option)
 //from the apiconst
  getCurrencyOptions = async () => {
const optionsUrl = 'https://api.exchangerate.host/symbols';  
  const  res = await fetch(optionsUrl) 
 //console.log(res)
  const json  =  await res.json()
  return json.symbols;
}
// fetching the rate data(convert endPoint ) data from APi end point
const getCurrencyRate = async (fromCurrency, toCurrency) => { 
    const currencyConvertUrl  = new URL('https://api.exchangerate.host/convert')
  currencyConvertUrl.searchParams.append('from ',fromCurrency)
  currencyConvertUrl.searchParams.append('to',toCurrency)

const response = await fetch(currencyConvertUrl,)
const json = await response.json()

return json.result
} 
// this function will create new option element and craete it for the select element pass as an argument
const appendOptionElToSelectEl = (selectEl, optionItem) => {
  const optionEl = document.createElement('option');

  optionEl.value = optionItem.code;
  optionEl.textContent = optionItem.description;

  selectEl.appendChild(optionEl);
}

//set up currencies and make refrence to the dom element
const populateSelectEl = (selectEl, optionList) => {
      optionList.forEach(optionItem => {
      appendOptionElToSelectEl(selectEl, optionItem);
      })
}

const setUpCurrencies = async () => {
  const fromCurrency = document.querySelector('#fromCurrency')
  const toCurrency = document.querySelector('#toCurrency')

  const currencyOptions = await getCurrencyOptions()
  const currencies = Object.keys(currencyOptions).map(currencyKey => currencyOptions[currencyKey])

  console.log(currencies)
  populateSelectEl(fromCurrency, currencies )
  populateSelectEl(toCurrency, currencies )
}

const setupEventListener = () => {
  const formEl = document.querySelector('#covertForm')
  formEl.addEventListener('submit', async event =>{
    event.preventDefault()
    
  const fromCurrency = document.querySelector('#fromCurrency')
  const toCurrency = document.querySelector('#toCurrency')
  const amount = document.querySelector('#amount')
   const coverResultEl = document.querySelector('#covertResult')
try{

  const rate  = await getCurrencyRate(fromCurrency.value, toCurrency.value)
  const amountValue =  + amount.value;
  const convertionRate = + amountValue * rate.toFixed(2) ;
  coverResultEl.textContent = ` ${amountValue} ${fromCurrency.value} = ${convertionRate} ${toCurrency.value} `
  
}catch(err){
 coverResultEl.textContent = `There is an Error fetching data ${err.message}`
 coverResultEl.classList.add('error')
}
})
}

setUpCurrencies();
setupEventListener();
