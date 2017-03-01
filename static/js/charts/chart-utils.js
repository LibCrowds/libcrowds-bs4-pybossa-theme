/**
 * Utility class to help draw charts.
 */
class ChartUtils {

    /**
     * Highlights the bar in red.
     */
    static highlightBar(bar) {
        bar.fillColor = "rgba(186,0,0,0.1)";
        bar.strokeColor = "rgba(186,0,0,0.5)";
        bar.highlightStroke = "rgba(208,0,0,0.5)";
        bar.highlightFill = "rgba(186,0,0,0.05)";
    }


    /**
     * Returns a line chart dataset in the default style.
     */
    static getLineDataset(label, data) {
        return [{
            label: label,
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: data
        }];
    }


    /**
     * Returns a bar chart dataset in the default style.
     */
    static getBarDataset(label, data){
        return [{
            label: label,
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            highlightFill: "rgba(151,187,205,0.1)",
            highlightStroke: "rgba(151,187,205,1)",
            data: data
        }];
    }


    /**
     * Returns a donut chart dataset in the default style.
     */
    static getDonutDataset(label1, data1, label2, data2){
        return [{
        label: label1,
        color:"rgba(186, 0, 0, 1)",
        highlight: "rgba(208, 0, 0, 1)",
        value : data1
        }, {
        label: label2,
        color: "rgba(151, 187, 205, 1)",
        highlight: "rgba(151, 187, 205, 0.8)",
        value: data2
        }];
    }


    /**
     * Returns a radar chart dataset in the default style.
     */
    static getRadarDataset(label, data) {
        return [{
            label: label,
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: data
        }];
     }

    /**
     * Draw and return a bar chart in the default style.
     */
    static drawBarChart(canvas, container, data) {
        let ctx   = canvas[0].getContext("2d"),
            chart = new Chart(ctx).Bar(data);
        chart.draw();
        return chart;
    }


    /**
     * Draw and return a line chart in the default style.
     */
    static drawLineChart(canvas, container, data) {
        let ctx   = canvas[0].getContext("2d"),
            opts  = {populateSparseData:true},
            chart = new Chart(ctx).Line(data, opts);
        chart.draw();
        return chart;
    }


    /**
     * Draw and return a donut chart in the default style.
     */
    static drawDonutChart(canvas, container, data, legendContainer) {
        let legendTemplate = `<ul class=\"legend\">
                              <% for (var i=0; i<segments.length; i++){%>
                              <li><span style=\"background-color:
                              <%=segments[i].fillColor%>\"></span>
                              <%if(segments[i].label){%><%=segments[i].label%>
                              <%}%></li><%}%></ul>`;
        let ctx    = canvas[0].getContext("2d"),
            opts   = {tooltipTemplate: "<%=label%>", legendTemplate: legendTemplate},
            chart  = new Chart(ctx).Doughnut(data, opts),
            legend = chart.generateLegend();
        legendContainer.html(legend);
    }


    /**
     * Draw and return a radar chart in the default style.
     */
    static drawRadarChart(canvas, container, data) {
        let tooltipTemplate = "<%if(label)\u007B%><%=label%>: <%}%><%=value%>%";
        let ctx   = canvas[0].getContext("2d"),
            opts  = {populateSparseData:true, tooltipTemplate: tooltipTemplate},
            chart = new Chart(ctx).Radar(data, opts);
        chart.draw();
        return chart;
    }


    /**
     * Return n followed by noun, pluralised with suffix if necessary.
     */
    static pluralise(n, noun, suffix){
        suffix = (typeof suffix === 'undefined') ? 's' : suffix;
        if (suffix == 'ies') {
            return `${n} ` + noun.substring(0, noun.length - 1) + suffix;
        }
        if (n == 1) {
            return `${n} ${noun}`;
        }
        return `${n} ${noun}${suffix}`;
    }
}