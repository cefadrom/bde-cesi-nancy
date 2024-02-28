import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { SwiperOptions } from "swiper/types";

export function createSwiperInstance(element: string, options: SwiperOptions = {}): Swiper {
    return new Swiper(element, {
        modules: [ Navigation, Autoplay, Pagination ],
        ...options,
    });
}
