import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const PHOTOS: { url: string; id: string }[] = [
  {
    id: "photo-02",
    url: "https://scontent.fkiv7-1.fna.fbcdn.net/v/t51.82787-15/703015178_18043593416787482_5678886143421210423_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=IMuJiy9LrvkQ7kNvwF3DaHC&_nc_oc=AdqPn_7HzAu98hSonFearo8ucaWyADyTD6iCxw-BpUoOohIqOWx2WMRRYBiizaFKvDQ4Ro2MboHrGGWHGEUCo2eW&_nc_zt=23&_nc_ht=scontent.fkiv7-1.fna&_nc_gid=hi1VbQKVSpQijN6XwcZJKQ&_nc_ss=7b2a8&oh=00_Af6qhN0Sw-WUaQRXaAubJfBMgFhbJAn0lPj3JG1J2T-HjA&oe=6A1520B3",
  },
  {
    id: "photo-03",
    url: "https://scontent.fkiv7-1.fna.fbcdn.net/v/t51.82787-15/701216828_18043593362787482_7937833894848273650_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4tRLPG_RUiwQ7kNvwHf6MGX&_nc_oc=AdoReCFYYR05kfCOWL1HMA3he6HvuIEP3S8uBd85Cfh3idM4ocUwlYrssvrtvZKpbcN6pVIpEY8Igxrgv14gCZBU&_nc_zt=23&_nc_ht=scontent.fkiv7-1.fna&_nc_gid=jXfdfk7lGn0moymKWI5cbQ&_nc_ss=7b2a8&oh=00_Af7hDYIW2PlLC-bORKr2bgVPdRJrGpcDTpGAayENoPixjw&oe=6A1519C2",
  },
  {
    id: "photo-04",
    url: "https://scontent.fkiv7-1.fna.fbcdn.net/v/t51.82787-15/684696860_18041888687787482_6787521258517227851_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=sS5105bMwHEQ7kNvwEIW-iF&_nc_oc=AdrReaHocVD3t2UX_UPKIQQBs94aPe2ShxVDScLVP_udazkRfi69p2l3Y6euFTAsi9juxl6RBASfVfxekgnbZALt&_nc_zt=23&_nc_ht=scontent.fkiv7-1.fna&_nc_gid=K-Px91UuPGQF1ciooOdvuA&_nc_ss=7b2a8&oh=00_Af721CCpmjkaSFitPtG28ZHNX7RzB5TYw58Xnc0WkWjLsQ&oe=6A153376",
  },
  {
    id: "photo-05",
    url: "https://scontent.fkiv7-1.fna.fbcdn.net/v/t51.82787-15/657831796_18035997254787482_1498041098296401655_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=0seesGhmmzIQ7kNvwHwEnoy&_nc_oc=AdoU8wy2VM66rNri8kS8igH5iVpps-sfjvIGjUj3V6aP--MAv_nan4kC3I_lLjlvAjXq1-zVT46dJ5EUGL1n_LuG&_nc_zt=23&_nc_ht=scontent.fkiv7-1.fna&_nc_gid=sE-QrBDOIUCK8YdmXrAdxA&_nc_ss=7b2a8&oh=00_Af75wyDEdpPG24mV7WaO7Q9nG7D8oRphf7t5E1CnTLazQA&oe=6A152755",
  },
  {
    id: "photo-06",
    url: "https://scontent.fkiv7-1.fna.fbcdn.net/v/t51.82787-15/654575826_18035997356787482_4753742305667869095_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=eXm6EIfiB_sQ7kNvwEUYbgn&_nc_oc=AdrdWOIo_bhSdsFaDw03XQP2smLtmPfaGIOcFPUmKbYDLSiDWvjVisIy_d5nOUMIzI96caJlsClDXm2BOcyqd01p&_nc_zt=23&_nc_ht=scontent.fkiv7-1.fna&_nc_gid=7w5yZuLkDtanMVxkx15znw&_nc_ss=7b2a8&oh=00_Af6XUU4JVpnVprSiQ2_gaX72vxPp4vc8eUU8zyTEvsGdOQ&oe=6A154AEB",
  },
  {
    id: "photo-07",
    url: "https://scontent.fkiv7-1.fna.fbcdn.net/v/t51.82787-15/658343904_18035997272787482_5319802211463984239_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ABekQtwA4YIQ7kNvwHSpkmW&_nc_oc=AdpYYTYHoPekxUseBvHbvmkg14aEzYd1eqgdLxqJm1g50thxojmniXYiXcYRtgnbUhHrmA5odSpcteC-OZv6A&_nc_zt=23&_nc_ht=scontent.fkiv7-1.fna&_nc_gid=tBoLgOXYNv_O5sPqghaSOA&_nc_ss=7b2a8&oh=00_Af4Ykgj9CH0PPb0gtPnflVxM-9a7uY-YAkpeZL3qfAdZCQ&oe=6A1543A8",
  },
  {
    id: "photo-08",
    url: "https://scontent.fkiv7-1.fna.fbcdn.net/v/t51.82787-15/652882838_18034592519787482_1322492720741761317_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_p2e5iYA0b0Q7kNvwF9Y05B&_nc_oc=AdorKiPUF1Bjs3E0mm59RgYSEk677tvsgtMQprRJon9EMuUvMPkYCm_LRb-6QkjhGuhAWrljC_y2Y0o9uPl1V5JV&_nc_zt=23&_nc_ht=scontent.fkiv7-1.fna&_nc_gid=Upir-cB57b3bzor5HO3Sjg&_nc_ss=7b2a8&oh=00_Af6E9okBp__OMvKTzHJyOfochPec91KJZq2Wm2ReBOTNEA&oe=6A151E91",
  },
];

async function main() {
  for (const photo of PHOTOS) {
    try {
      const result = await cloudinary.uploader.upload(photo.url, {
        folder: "emmanuil-church/gallery/ru",
        public_id: photo.id,
        overwrite: true,
      });
      console.log(`✓ ${photo.id}:`, result.secure_url);
    } catch (e) {
      console.error(`✗ ${photo.id}:`, e);
    }
  }
}

main();
