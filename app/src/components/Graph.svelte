<script lang="ts">
    import { Line } from 'svelte-chartjs';
    import{
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
        Filler
    } from 'chart.js';

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
        Filler
    );
    import {writableHeartRateArray} from "$lib/stores";
    import {writableOxygenArray} from "$lib/stores";
    let date = new Date().getTime()
    let labels_graph = [date]


    $: data = {
        labels: labels_graph,
        datasets: [
            {
                label: 'Oxygen',
                data: $writableOxygenArray,
                yAxisID: 'y',
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 1
            },
            {
                label: 'Heart Rate in bpm',
                data: $writableHeartRateArray,
                borderColor: 'black',
                borderWidth: 2,
                pointRadius: 1,
                tension:0.3,
                fill: false,
                yAxisID: 'y1'
            }
        ]
    };

</script>

<style>
    main{
        border: 1px solid gainsboro;
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
        margin-bottom: 50px;
    }

    h2{
        font-weight: bold;
        font-size: larger;
    }
</style>

<main>
    <h2>Pulse Data Graph</h2>
    <div class="graph">
        <Line data = {data}
              height = {700}
              options={
                  {
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                          xAxis: {
                              reverse: true,
                              display: true
                          },
                          y: {
                              min: -1,
                              max: 1
                          },
                          x: {
                              display: false,
                              ticks: {
                                  display: false
                              }
                          }
                      }
                  }
              }
        />
    </div>
</main>