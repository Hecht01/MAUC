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
    import {writableRawDataArray} from "$lib/stores";
    import {writableTimestamps} from "$lib/stores";

    // Dynamic Data using the store writableTimestamps as labels
    $: data = {
        labels: $writableTimestamps,
        datasets: [
            {
                label: 'Oxygen',
                data: $writableRawDataArray,
                borderColor: 'green',
                yAxisID: 'y',
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 1
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

    <!-- Displays the raw data dynamically as a line graph, updated on message via the stores-->
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