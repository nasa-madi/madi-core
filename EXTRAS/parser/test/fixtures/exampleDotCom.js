const example = {
  html: `

<!doctype html>
<html>
<head>
    <title>Example Domain</title>

    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="description" content="Free Web tutorials">
    <meta name="keywords" content="HTML, CSS, JavaScript">
    <meta name="author" content="John Doe">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
    body {
        background-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        
    }
    div {
        width: 600px;
        margin: 5em auto;
        padding: 2em;
        background-color: #fdfdff;
        border-radius: 0.5em;
        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
    }
    a:link, a:visited {
        color: #38488f;
        text-decoration: none;
    }
    @media (max-width: 700px) {
        div {
            margin: 0 auto;
            width: auto;
        }
    }
    </style>    
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is for use in illustrative examples in documents. You may use this
    domain in literature without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>
</body>
</html>

`,

  response: [
    {
      scope: 'http://example.com:80',
      method: 'GET',
      path: '/',
      body: '',
      status: 200,
      response: [
        '1f8b0800c215a85d00037d544d73db2010bdfb576cd54b32232427691a8f2d69fa99690f690f690f3d12b1b298085001c9f674f2dfbb428e2337999a91815d78bbefb190bd12a6f4bb16a1f6aa2966d963875c1433a05fe6a56fb0f8bce5aa6d103e19c5a5ced2d13a1b9728f41cca9a5b873e8f3a5fb14504693171d6deb70c7f77b2cfa38f467bd49e0d612328c7591e79dcfa7408bf3a40bd84a4b9c23cea256e5a63fd64ff460a5fe7027b59220b9318a4965ef286b99237989f3d4139bf23324306fbc0a573d1e8bb3362077fc2304c7979bfb6a6d38295a6317609afab39b5f3d56189e2762df512e64fa6960b21f5fac85651a6ace24a36bb2530de929ccced9c4715c3d8b34ec6f0a191fafe8697b7c1744d9b62886e716d107e7e8d68fcbd450db75cbb61f2059b1ebd2c397cc30ec97230c4f0de1277c2a6a5cca195d5532e61f010fe85ec277483704b783b9fb7dbe70c2f5101efbc7981e839aad57f4513d42619dc192bd032cb85ec1ce9945c1e01982d7335176643c8ed162ee8bba26f18dbf51d3f99c7a125f3f3d3d5840c5f0eeac5d4f7d2498f6242ed31938bc59bc56292c970fe4c60692cf7d2104b6d344e41df291492c389e25bb6d7e76ad0e774027eace25155fca3d844e563c7c3246496860a2dc25965e9781d67d9509b743b29d8be8eebb36737934ca3af2d7ed4d2810876a051652c740e6198354de7fc40b847c011c10d0e7a0e3a45f7c925f0cb74446217b678421aab658fa6a1217909a0b348747c6d3a0fad9514a23474b452073181e6dcdd538584e82d5a259d234792a5ed21cf8c1e088b551e0dcf845ba6e966b34924d73c31769d8e215dba4f332a6e8c1d4810a00a419284d0781110b3348893a57ba9d2f141fb0b28eb7c6fe8040000'
      ],
      rawHeaders: [
        'Content-Encoding',
        'gzip',
        'Age',
        '408705',
        'Cache-Control',
        'max-age=604800',
        'Content-Type',
        'text/html; charset=UTF-8',
        'Date',
        'Mon, 29 Aug 2022 20:33:04 GMT',
        'Etag',
        '"3147526947+gzip"',
        'Expires',
        'Mon, 05 Sep 2022 20:33:04 GMT',
        'Last-Modified',
        'Thu, 17 Oct 2019 07:18:26 GMT',
        'Server',
        'ECS (nyb/1D04)',
        'Vary',
        'Accept-Encoding',
        'X-Cache',
        'HIT',
        'Content-Length',
        '648',
        'Connection',
        'close'
      ],
      responseIsBinary: false
    }
  ]
};

export default example;
