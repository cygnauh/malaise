import React, { Component } from 'react';
import './style.scss';

class EmojiSad extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <svg className="EmojiSad" viewBox="0 0 102 103">
                <g transform="translate(-699.000000, -277.000000)" fill="#EAEAEA">
                    <g transform="translate(698.500000, 277.082678)">
                        <path d="M51.3813039,101.832653 L51.3813039,102.332653 C44.5133737,102.332653 37.8490713,100.98714 31.5756798,98.3337568 C25.5168541,95.77111 20.0750011,92.1021288 15.4028077,87.4298643 C10.7305909,82.7577186 7.06165613,77.3158814 4.49898353,71.2569947 C1.84551366,64.9837354 0.500014075,58.319513 0.500014075,51.4513628 C0.500014075,44.5832474 1.84552739,37.918957 4.49898022,31.645809 C7.0616261,25.5869855 10.7305356,20.1452036 15.4028023,15.4729369 C20.07492,10.8007482 25.5167476,7.13180197 31.5756808,4.56903865 C37.8490713,1.91565543 44.5133737,0.570143306 51.3813039,0.570143306 C58.2492875,0.570143306 64.9135217,1.91564889 71.1868622,4.56904101 C77.2457898,7.13180197 82.6876174,10.8007482 87.3597324,15.4729342 C92.0320018,20.1452036 95.7009113,25.5869855 98.263555,31.6458037 C100.91699,37.9190781 102.262523,44.5833782 102.262523,51.4513628 C102.262523,58.3193822 100.917004,64.9836143 98.2635572,71.2569869 C95.7008813,77.3158814 92.0319465,82.7577186 87.3597351,87.429859 C82.6875363,92.1021288 77.2456833,95.77111 71.1868585,98.3337564 C64.9135217,100.987147 58.2492875,102.332653 51.3813039,102.332653 L51.3813039,101.832653 Z M51.3813039,2.17778401 L51.3813039,2.67778401 C44.7959553,2.67778401 38.4093259,3.96713542 32.3967012,6.51027912 C26.588798,8.96678837 21.3731018,12.4833396 16.893124,16.9632477 C12.4132627,21.4431786 8.89675627,26.6587909 6.44007937,32.4668307 C3.896993,38.479415 2.60765478,44.8660484 2.60765478,51.4513628 C2.60765478,58.0367387 3.89698961,64.4233729 6.44007639,70.4359581 C8.896786,76.2440752 12.4133164,81.4597406 16.8931185,85.9395427 C21.3730755,90.41943 26.5887652,93.9359943 32.3966996,96.3925865 C38.4093631,98.9356769 44.7959979,100.225012 51.3813039,100.225012 C57.9666183,100.225012 64.3532516,98.9356737 70.3658336,96.3925883 C76.1737726,93.9360236 81.3894075,90.4194844 85.8694162,85.9395454 C90.3492473,81.4597143 93.8657646,76.2440424 96.3223896,70.4359606 C98.8655314,64.42341 100.154883,58.0367813 100.154883,51.4513628 C100.154883,44.8660058 98.865528,38.4793778 96.3223887,32.4668331 C93.8657943,26.6588238 90.349301,21.443205 85.8694189,16.9632532 C81.3893812,12.4832851 76.1737398,8.96675905 70.3658314,6.51027706 C64.3532888,3.96713866 57.9666609,2.67778401 51.3813039,2.67778401 L51.3813039,2.17778401 Z M39.2282566,27.1453314 C41.9130132,27.1453314 44.0894473,32.5864167 44.0894473,39.2983436 C44.0894473,46.0103408 41.9130132,51.4513557 39.2282566,51.4513557 C36.5434999,51.4513557 34.3669954,46.0103408 34.3669954,39.2983436 C34.3669954,32.5864167 36.5434999,27.1453314 39.2282566,27.1453314 Z M65.9649185,27.1453314 C68.6496752,27.1453314 70.8261093,32.5864167 70.8261093,39.2983436 C70.8261093,46.0103408 68.6496752,51.4513557 65.9649185,51.4513557 C63.2801618,51.4513557 61.1037277,46.0103408 61.1037277,39.2983436 C61.1037277,32.5864167 63.2801618,27.1453314 65.9649185,27.1453314 Z M23.34775,77.9014898 C23.6449405,77.3753024 24.0278953,76.7459252 24.4987753,76.0373079 C25.8604266,73.9881881 27.5363087,71.9382665 29.5441768,70.0139234 C32.2356968,67.4343353 35.2409337,65.37695 38.4761447,63.899932 C42.5234508,62.0521933 46.9365974,61.1155383 51.5900041,61.1155383 C56.2438141,61.1155383 60.6510698,62.0523573 64.6864359,63.9004831 C67.9123917,65.3779811 70.9042866,67.4360021 73.5787316,70.016391 C75.5738599,71.9413291 77.2360201,73.9918967 78.5838728,76.0416925 C79.0476681,76.7470259 79.4247935,77.3736351 79.7177799,77.8983498 L80.9414731,77.1322847 L81.9826325,78.7954353 L77.6309766,81.5196155 L76.5897958,79.8565525 L77.8996156,79.0365699 C77.5931373,78.4842142 77.2253478,77.8737225 76.7951705,77.2197708 C75.5115941,75.2684891 73.9383646,73.3253057 72.0656272,71.5231779 C69.5650889,69.1168786 66.7751804,67.2018973 63.7733026,65.8305163 C60.026382,64.1187099 55.9283347,63.250465 51.5900041,63.250465 C47.2420006,63.250465 43.1291575,64.1225893 39.362793,65.8421034 C36.3471986,67.2187699 33.5408125,69.140633 31.0214195,71.5552424 C29.1403387,73.3580725 27.5599437,75.2963448 26.2703437,77.238958 C25.8401163,77.8870391 25.4719767,78.4918219 25.1648627,79.0390322 L26.4707887,79.8565632 L25.4295016,81.5196016 L21.077868,78.7954353 L22.1190253,77.1322879 L23.34775,77.9014898 Z"></path>
                    </g>
                </g>
            </svg>
        )
    }
}

export default EmojiSad;