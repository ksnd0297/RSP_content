const moment = require('moment')

module.exports = {
    html:
        `
        <!doctype html>
        <html>
        <head>
          <title></title>
          <meta charset="utf-8">
        </head>
        <body>
            <form action="/process1", method="post">
                <input type="date" name="date" value="${moment().utc(9).format("YYYY-MM-DD")}">
                <input type="submit" value="날짜" id="dd">
            </form>
            <form action="/process2", method="post">
                <input type="submit" value="측정">
            </form>
        </body>
        </html>
        `,
  alert:
	`
	<script>alert("error");window.location.href='/';</script>
	`
}