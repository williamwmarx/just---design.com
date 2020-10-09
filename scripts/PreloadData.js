const Sheets = {
  getData(sheet_id, page, column_count) {
    return fetch(`https://spreadsheets.google.com/feeds/cells/${sheet_id}/${page}/public/full?alt=json`)
      .then(response => {return response.json()}
    ).then(data => {
      let sheet_data = []
      let entries = data["feed"]["entry"]
      for (var i = 0; i < entries.length; i += column_count) {
        let row = entries.slice(i, i+column_count)
        let row_content = []
        for (var j = 0; j < column_count; j++) {
          let cell = row[j]["content"]["$t"]
          row_content.push((cell === "N/A") ? null : cell)
        }
        if (row_content[0] !== "") sheet_data.push(row_content)
      }
      return sheet_data
    })
  }
}

let sheet_id = `10xoMrSOqSeUDrYtNgT8tIdsvQK1Qp1x7copA3kPu_cs`
let data_to_load = {
  "Racial Justice Readings": {
    "page": 1,
    "column_count": 10
  },
  "Racial Justice Media": {
    "page": 2,
    "column_count": 11
  },
  "Design Resources": {
    "page": 3,
    "column_count": 10
  },
  "BIPOC Studios": {
    "page": 7,
    "column_count": 11
  },
  "One Click Activism": {
    "page": 4,
    "column_count": 6
  },
  "Glossary": {
    "page": 5,
    "column_count": 4
  },
  "Sources": {
    "page": 6,
    "column_count": 3
  },
  "Stats": {
    "page": 8,
    "column_count": 2
  }
}

for (let key of Object.keys(data_to_load)) {
  filename = key.split(" ").join("") + "Sparse.json"
  getData(sheet_id, data_to_load[key]["page"], data_to_load[key]["column_count"])
}
