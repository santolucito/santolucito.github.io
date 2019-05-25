## This is where you want the entire toolchain to live
## You should run this script from within the destination directory, or 
##  redefine the BASE variable to fit your lifestyle.
BASE=$(pwd)

echo
echo [getESP32.sh]: Checking for system prerequisites
[[ $(which pacman) ]] && sudo pacman -S --needed gcc git make ncurses flex bison gperf python2-pyserial wget 2>/dev/null
[[ $(which apt-get) ]] && sudo apt-get install git make libncurses-dev flex bison gperf python python-serial wget 2>/dev/null


## Get or update IDF
echo
if [[ -d esp-idf ]] ; then 
	echo "[getESP32.sh]:  found esp-idf, updating"
	cd esp-idf 
	git pull && git submodule update --recursive 
	cd $BASE
else  ## not found, get it
	git clone --recursive https://github.com/espressif/esp-idf.git
fi

## Get binary toolchain -- this might get out of date when they change blobs:
## Current version Sept 29, 2016
echo
if [[ -d xtensa-esp32-elf ]] ; then 
	echo "[getESP32.sh]:  Found binary toolchain.  Moving on to template app."
else
	wget https://dl.espressif.com/dl/xtensa-esp32-elf-linux64-1.22.0-59.tar.gz
	tar xvzf xtensa-esp32-elf-linux64-1.22.0-59.tar.gz && \
		rm xtensa-esp32-elf-linux64-1.22.0-59.tar.gz
fi

## Get demo application
echo
if [[ -d esp-idf-template ]] ; then 
	echo "[getESP32.sh]:  Found esp-idf-template, updating"
	cd esp-idf-template 
	git pull 
	cd $BASE
else  ## not found, get it
	git clone https://github.com/espressif/esp-idf-template.git
fi

## Setup environment variables:
##  Works for _this_ directory structure.  You will need to change these if you deviate
## Also, you might copy these lines into a separate script 
##   to reset these variables as necessary.

echo
echo [getESP32.sh]:  Exporting environment variables:
export IDF_PATH=${BASE}/esp-idf
echo [getESP32.sh]:  export IDF_PATH=${BASE}/esp-idf
export PATH=$PATH:${BASE}/xtensa-esp32-elf/bin
echo [getESP32.sh]:  export PATH=$PATH:${BASE}/xtensa-esp32-elf/bin

echo
echo [getESP32.sh]:  cd $BASE/esp-idf-template and 
echo [getESP32.sh]:    type make menuconfig or make flash to get going

