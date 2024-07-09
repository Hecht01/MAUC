/*
Arduino-MAX30100 oximetry / heart rate integrated sensor library
Copyright (C) 2016  OXullo Intersecans <x@brainrapers.org>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// The example shows how to retrieve raw values from the sensor
// experimenting with the most relevant configuration parameters.
// Use the "Serial Plotter" app from arduino IDE 1.6.7+ to plot the output

#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#include "MAX30100.h"

// Sampling is tightly related to the dynamic range of the ADC.
// refer to the datasheet for further info
#define SAMPLING_RATE                       MAX30100_SAMPRATE_100HZ

// The LEDs currents must be set to a level that avoids clipping and maximises the
// dynamic range
#define IR_LED_CURRENT                      MAX30100_LED_CURR_50MA
#define RED_LED_CURRENT                     MAX30100_LED_CURR_27_1MA

// The pulse width of the LEDs driving determines the resolution of
// the ADC (which is a Sigma-Delta).
// set HIGHRES_MODE to true only when setting PULSE_WIDTH to MAX30100_SPC_PW_1600US_16BITS
#define PULSE_WIDTH                         MAX30100_SPC_PW_1600US_16BITS
#define HIGHRES_MODE                        true

#define REPORTING_PERIOD_MS     1000

// Instantiate a MAX30100 sensor class
MAX30100 sensor;
PulseOximeter pox;

uint32_t tsLastReport = 0;

boolean pulse = 0;

void onBeat(){
    pulse = 1;
}

void setup()
{
    Serial.begin(115200);

    Serial.print("Initializing MAX30100..");


    // Set up the wanted parameters
    sensor.setMode(MAX30100_MODE_SPO2_HR);
    sensor.setLedsCurrent(IR_LED_CURRENT, RED_LED_CURRENT);
    sensor.setLedsPulseWidth(PULSE_WIDTH);
    sensor.setSamplingRate(SAMPLING_RATE);
    sensor.setHighresModeEnabled(HIGHRES_MODE);


    if (!pox.begin()) {
        Serial.println("FAILED PulseOximeter");
        for(;;);
    } else {
        Serial.println("SUCCESS PulseOximeter");
    }

    if(!sensor.begin(){
        Serial.println("FAILED Pulsemesser");
        for(;;);
    } else {
        Serial.println("SUCCESS Pulsemesser");
    }

    pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
    pox.setOnBeatDetectedCallback(onBeat);
}

void loop()
{
    uint16_t ir, red;

    pox.update();
    sensor.update();
    sensor.getRawValues(&ir, &red);

    if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
        String json = "{\"heartRate\":" + String(pox.getHeartRate()) + ",\"SpO2\":" + String(pox.getSpO2()) + ",\"rawData\":" + String(ir) + ",\"SpO2\":" + String(pulse) + "}";
        Serial.println(json);

        tsLastReport = millis();

    }
    pulse = 0;
}
