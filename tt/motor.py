import wiringpi
import time

wiringpi.wiringPiSetup()

while(True):
	wiringpi.pinMode(24, 1)