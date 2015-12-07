//讀取到的資料
var loadedData;

$.extend($.fn.dataTableExt.oSort, {
    "generation-pre": function (a) {
        return $.inArray(a, ['C1', 'E2', 'G3', 'R4', 'PRO', 'SR', 'Z7', 'HT', '9']);
    },
    "generation-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "generation-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

//讀取資料
d3.csv("cars.csv", function (error, data) {
    if (error) {
        return console.warn(error);
    }
    window.loadedData = data;

    //填表格開始
    var tbody = d3.select('#tbody');
    tbody.selectAll('tr').remove();
    var tr = tbody.selectAll('tr')
            .data(data).enter()
            .append('tr');
    tr.selectAll('td')
            .data(function (d) {
                return [d.generation, d.type, d.sn, d.name, d.image];
            }).enter()
            .append('td')
            .html(function (d, i) {
                if (i === 4) {
                    return '<img src="img/' + d + '">';
                }
                return d;
            });
    //填表格結束
    var table = $('#dataTable').DataTable({
        iDisplayLength: 50,
        aoColumnDefs: [
            {sType: "generation", aTargets: [0]}
        ]
    });
});