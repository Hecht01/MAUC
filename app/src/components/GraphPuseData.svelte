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
    import {writableTimestamps} from "$lib/stores";

    $: data = {
        labels: $writableTimestamps,
        datasets: [
            {
                label: 'Oxygen',
                data: $writableOxygenArray,
                borderColor: 'blue',
                yAxisID: 'y',
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 1
            },
            {
                label: 'Heart Rate in bpm',
                data: $writableHeartRateArray,
                borderColor: 'red',
                borderWidth: 2,
                pointRadius: 1,
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
                              display: true
                          },
                          y: {
                              min: 0,
                              max: 100
                          },
                          y1: {
                              min: 0,
                              max: 180
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