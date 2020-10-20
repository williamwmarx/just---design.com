const Sheets = {
  getData(sheet_id, page, column_count) {
    return fetch(
      `https://spreadsheets.google.com/feeds/cells/${sheet_id}/${page}/public/full?alt=json`
    )
      .then(response => {
        return response.json()
      })
      .then(data => {
        let sheet_data = []
        let entries = data["feed"]["entry"]
        for (var i = 0; i < entries.length; i += column_count) {
          let row = entries.slice(i, i + column_count)
          let row_content = []
          for (var j = 0; j < column_count; j++) {
            let cell = row[j]["content"]["$t"]
            row_content.push(cell === "N/A" ? null : cell)
          }
          if (row_content[0] !== "") sheet_data.push(row_content)
        }
        return sheet_data
      })
  },
}

export default Sheets
