
const bookingMsg = (cabin, startDate, endDate, adults, kids, pets, user, mail) => {

  
  const html = `<div  style='margin-left:auto; width:100%; background-color: #e5e5e5; border: 1px solid rgba(0, 115, 170, 1); border-radius: 15px;'>
  <h4 style='margin:.5px 0; border-radius:15px 15px 0 0; width: 100%; text-align: center; background-color:rgba(0, 115, 170, 1);'>Consulta para Reservar <span style='font-size: larger; color: #e5e5e5;'>${cabin}</span></h4>
  
  <div style='margin-left: auto; width: 75%;'>
      <p style='display: inline-block; width: 45%;'>Consulta de <span style='font-size: larger; font-weight: bolder; color: rgba(0, 115, 170, 1);'>${user}</span></p>
      <p style='display: inline-block; width: 45%;'>Mail: <span style='font-size: larger; font-weight: bolder; color: rgba(0, 115, 170, 1);'>${mail}</span></p>

  </div>
  <section style='margin-left: auto; width: 75%;'>
      <p style='display: inline-block; width: 45%;'>Desde: <span style='font-size: larger; font-weight: bolder; color: rgba(0, 115, 170, 1);'>${startDate}</span></p>
      <p style='display: inline-block; width: 45%;'>Hasta: <span style='font-size: larger; font-weight: bolder; color: rgba(0, 115, 170, 1);'>${endDate}</span></p>
  </section>
  
  <section style='margin: auto; width: max-content;'>
      <p>Adultos: <span style='font-size: larger; font-weight: bolder; color: rgba(0, 115, 170, 1);'>${adults}</span></p>
      ${kids===0 ?'' : `<p>Niños: <span style='font-size: larger; font-weight: bolder; color: rgba(0, 115, 170, 1);'>${kids}</span></p>`}
      ${pets===0 ?'' : `<p>Mascotas: <span style='font-size: larger; font-weight: bolder; color: rgba(0, 115, 170, 1);'>${pets}</span></p>`}
  </section>


  </div>`
  const text = `
    Consulta para Reservar ${cabin}\n
    Consulta de: ${user} \n
    mail: ${mail}\n\n
    Desde: ${startDate}\n
    Hasta: ${endDate}\n\n
    Adultos: ${adults}\n
    ${kids === 0 ? '' : `Niños: ${kids}\n`}
    ${pets === 0 ? '' : `Mascotas: ${pets}\n`}
  `
  return {html:html, text:text}
}

const contactUsMsg = () => {

}

module.exports = {bookingMsg, contactUsMsg}