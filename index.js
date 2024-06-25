const http = require('https');

function inputValidation(data) {
    const { tcno, name, surname, birthyear } = data;

    if (tcno.length !== 11) {
        return false;
    }
    if (name.length < 2) {
        return false;
    }
    if (surname.length < 2) {
        return false;
    }

    if (birthyear.toString().length !== 4) {
        return false;
    }

    if (name !== name.toUpperCase()) {
        data.name = name.toUpperCase();
    }

    if (surname !== surname.toUpperCase()) {
        data.surname = surname.toUpperCase();
    }


    return null;
}

async function MakeRequest(data) {
    const { tcno, name, surname, birthyear } = data;
    const url = 'tckimlik.nvi.gov.tr';

    const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://tckimlik.nvi.gov.tr/WS">
        <soapenv:Header/>
        <soapenv:Body>
            <ws:TCKimlikNoDogrula>
                <ws:TCKimlikNo>${tcno}</ws:TCKimlikNo>
                <ws:Ad>${name}</ws:Ad>
                <ws:Soyad>${surname}</ws:Soyad>
                <ws:DogumYili>${birthyear}</ws:DogumYili>
            </ws:TCKimlikNoDogrula>
        </soapenv:Body>
    </soapenv:Envelope>`;

    const options = {
        hostname: url,
        port: 80,
        path: '/Service/KPSPublic.asmx?op=TCKimlikNoDogrula',
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'Content-Length': soapEnvelope.length,
            'SOAPAction': 'http://tckimlik.nvi.gov.tr/WS/TCKimlikNoDogrula'
        }
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let responseData = '';

            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                const responseIndex = responseData.indexOf('<TCKimlikNoDogrulaResult>') + '<TCKimlikNoDogrulaResult>'.length;
                const result = responseData.substring(responseIndex, responseData.indexOf('</TCKimlikNoDogrulaResult>', responseIndex));
                
                resolve(result === 'true');
            });
        });

        req.on('error', (err) => {
            console.error('HTTP isteği sırasında hata:', err);
            reject(err);
        });

        req.write(soapEnvelope);
        req.end();
    });
}

exports.validate = async function (data) {
    const validationError = inputValidation(data);
    if (validationError) {
        return validationError;
    }

    const isValid = await MakeRequest(data);

    if (isValid) {
        return true;
    } else {
        return false;
    }
};