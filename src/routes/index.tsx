import { component$, useStore, mutable } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Grid from "~/components/grid";
import Column from "~/components/column";
import ComboBox from "~/components/combobox";
import EmptyState from "~/components/empty";

interface CountryType {
  country_code: string;
  name: string;
  official_name: string;
  continent: string;
  continent_code: string;
  currency_code: string;
  calling_code: string;
  internet_tld: string;
  flag: string;
}

interface StateType {
  state_name: string;
}

interface CityType {
  city: string;
}

interface DistrictType {
  district: string;
}

interface SubDistrictType {
  country: string;
  state_code: string;
  state_name: string;
  city: string;
  district: string;
  sub_district: string;
  zipcode: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export default component$(() => {
  const predefine = useStore({
    location: "Monumen Nasional, DKI Jakarta",

    display_state: false,
    display_city: false,
    display_district: false,
    display_sub_district: false,

    empty_country: false,
    empty_state: false,
    empty_city: false,
    empty_district: false,
    empty_sub_district: false,
  });

  let country = useStore<CountryType>({
    country_code: "",
    name: "",
    official_name: "",
    continent: "",
    continent_code: "",
    currency_code: "",
    calling_code: "",
    internet_tld: "",
    flag: "",
  });

  let state = useStore<StateType>({
    state_name: "",
  });

  let city = useStore<CityType>({
    city: "",
  });

  let district = useStore<DistrictType>({
    district: "",
  });

  let sub_district = useStore<SubDistrictType>({
    country: "",
    state_code: "",
    state_name: "",
    city: "",
    district: "",
    sub_district: "",
    zipcode: "",
    latitude: 0,
    longitude: 0,
    timezone: "",
  });

  const displayLocation = () => {
    let location = [];

    if (sub_district.sub_district) {
      location.push(sub_district.sub_district);
    }

    if (sub_district.district) {
      location.push(sub_district.district);
    }

    if (sub_district.city) {
      location.push(sub_district.city);
    }

    if (sub_district.state_name) {
      location.push(sub_district.state_name);
    }

    if (location.length == 0) {
      location.push(predefine.location);
    }

    return location.join(", ");
  };

  const showCombobox = (field: string): boolean => {
    switch (field) {
      case "state_name":
        return !predefine.empty_state;
      case "city":
        return !predefine.empty_state && !predefine.empty_city;
      case "district":
        return (
          !predefine.empty_state &&
          !predefine.empty_city &&
          !predefine.empty_district
        );
      case "sub_district":
        return (
          !predefine.empty_state &&
          !predefine.empty_city &&
          !predefine.empty_district &&
          !predefine.empty_sub_district
        );
    }

    return true;
  };

  return (
    <Grid>
      <Column>
        <ComboBox
          entity="country"
          field="name"
          alternative_field="country_code"
          placeholder="Search country name"
          onEmpty$={() => {
            predefine.display_state = false;
            predefine.empty_country = true;
          }}
          onSelected$={(result: CountryType) => {
            predefine.display_state = true;
            predefine.empty_state = false;

            country.country_code = result.country_code;
            country.name = result.name;
            country.official_name = result.official_name;
            country.continent = result.continent;
            country.continent_code = result.continent_code;
            country.currency_code = result.currency_code;
            country.calling_code = result.calling_code;
            country.internet_tld = result.internet_tld;
            country.flag = result.flag;
          }}
        />
        {predefine.display_state ? (
          showCombobox("state_name") ? (
            <ComboBox
              entity="county/state"
              field="state_name"
              alternative_field="country_code"
              parent={mutable({
                country: country.country_code,
              })}
              placeholder="Search province or state name"
              onEmpty$={() => {
                predefine.display_city = false;
                predefine.empty_state = true;
              }}
              onSelected$={(result: StateType) => {
                predefine.display_city = true;
                predefine.empty_city = false;

                state.state_name = result.state_name;
              }}
            />
          ) : (
            <EmptyState>
              <span>State information for {country.name} is not available</span>
            </EmptyState>
          )
        ) : (
          <></>
        )}
        {predefine.display_city ? (
          showCombobox("city") ? (
            <ComboBox
              entity="county/city"
              field="city"
              alternative_field="zipcode"
              parent={mutable({
                country: country.country_code,
                state_name: state.state_name,
              })}
              placeholder="Search city name"
              onEmpty$={() => {
                predefine.display_district = false;
                predefine.empty_city = true;
              }}
              onSelected$={(result: CityType) => {
                predefine.display_district = true;
                predefine.empty_district = false;

                city.city = result.city;
              }}
            />
          ) : (
            <EmptyState>
              <span>City information for {country.name} is not available</span>
            </EmptyState>
          )
        ) : (
          <></>
        )}
        {predefine.display_district ? (
          showCombobox("district") ? (
            <ComboBox
              entity="county/district"
              field="district"
              alternative_field="zipcode"
              parent={mutable({
                country: country.country_code,
                state_name: state.state_name,
                city: city.city,
              })}
              placeholder="Search district name"
              onEmpty$={() => {
                predefine.display_sub_district = false;
                predefine.empty_district = true;
              }}
              onSelected$={(result: DistrictType) => {
                predefine.display_sub_district = true;
                predefine.empty_sub_district = false;

                district.district = result.district;
              }}
            />
          ) : (
            <EmptyState>
              <span>
                District information for {country.name} is not available
              </span>
            </EmptyState>
          )
        ) : (
          <></>
        )}
        {predefine.display_sub_district ? (
          showCombobox("sub_district") ? (
            <ComboBox
              entity="county/sub_district"
              field="sub_district"
              alternative_field="zipcode"
              parent={mutable({
                country: country.country_code,
                state_name: state.state_name,
                city: city.city,
                district: district.district,
              })}
              placeholder="Search sub district name"
              onEmpty$={(failed) => (predefine.empty_sub_district = failed)}
              onSelected$={(result: SubDistrictType) => {
                sub_district.country = result.country;
                sub_district.state_code = result.state_code;
                sub_district.state_name = result.state_name;
                sub_district.city = result.city;
                sub_district.district = result.district;
                sub_district.sub_district = result.sub_district;
                sub_district.zipcode = result.zipcode;
                sub_district.latitude = result.latitude;
                sub_district.longitude = result.longitude;
                sub_district.timezone = result.timezone;
              }}
            />
          ) : (
            <EmptyState>
              <span>
                Sub_district information for {country.name} is not available
              </span>
            </EmptyState>
          )
        ) : (
          <></>
        )}
      </Column>
      <Column>
        {sub_district.sub_district != "" || sub_district.zipcode != "" ? (
          <div
            class="rounded-lg overflow-y-scroll"
            style="height: calc(30rem - 48px);"
          >
            <iframe
              class="w-full h-64 rounded-lg bg-gray-50"
              scrolling="no"
              src={`https://maps.google.com/maps?hl=en&q=${displayLocation()}+()&t=p&z=14&ie=UTF8&iwloc=B&output=embed`}
            />
            <div class="w-full flex flex-wrap mt-4">
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Country Code
                </div>
                <div class="pt-2 text-gray-600">
                  {country.country_code || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Name
                </div>
                <div class="pt-2 text-gray-600">{country.name || "N/A"}</div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Official Name
                </div>
                <div class="pt-2 text-gray-600">
                  {country.official_name || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Continent
                </div>
                <div class="pt-2 text-gray-600">
                  {country.continent || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Continent Code
                </div>
                <div class="pt-2 text-gray-600">
                  {country.continent_code || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Currency Code
                </div>
                <div class="pt-2 text-gray-600">
                  {country.currency_code || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Calling Code
                </div>
                <div class="pt-2 text-gray-600">
                  {country.calling_code || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Internet TLD
                </div>
                <div class="pt-2 text-gray-600">
                  {country.internet_tld || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Flag
                </div>
                <div class="pt-2 text-gray-600">
                  {country.flag ? (
                    <img src={country.flag} class="w-6 h-auto" />
                  ) : (
                    "N/A"
                  )}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  State Code
                </div>
                <div class="pt-2 text-gray-600">
                  {sub_district.state_code || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  State Name
                </div>
                <div class="pt-2 text-gray-600">
                  {sub_district.state_name || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  City
                </div>
                <div class="pt-2 text-gray-600">
                  {sub_district.city || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  District
                </div>
                <div class="pt-2 text-gray-600">
                  {sub_district.district || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Sub District
                </div>
                <div class="pt-2 text-gray-600">
                  {sub_district.sub_district || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Zipcode
                </div>
                <div class="pt-2 text-gray-600">
                  {sub_district.zipcode || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Latitude
                </div>
                <div class="pt-2 text-gray-600">
                  {sub_district.latitude || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Longitude
                </div>
                <div class="pt-2 text-gray-600">
                  {sub_district.longitude || "N/A"}
                </div>
              </div>
              <div class="w-full md:w-1/2 p-2">
                <div class="text-xs font-medium uppercase text-gray-400">
                  Timezone
                </div>
                <div class="pt-2 text-gray-600">
                  {sub_district.timezone || "N/A"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class="p-6 border rounded-lg text-center">
            <div class="text-xl text-gray-700 mb-2">
              No information to display right now
            </div>
            <div class="text-gray-600">
              Please search the counties you want to know on the left form.
            </div>
          </div>
        )}
      </Column>
    </Grid>
  );
});

export const head: DocumentHead = {
  title: "Country Explorer | The Owl Engine",
  links: [
    {
      rel: "apple-touch-icon",
      sizes: "57x57",
      href: "https://owlengine.com/favicon/xapple-icon-57x57.png.pagespeed.ic.kr8U6x4A1v.webp",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: "https://owlengine.com/favicon/xapple-icon-60x60.png.pagespeed.ic.OYUpPMM0XF.webp",
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      href: "https://owlengine.com/favicon/xapple-icon-72x72.png.pagespeed.ic.lzwmrMu7Fb.webp",
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: "https://owlengine.com/favicon/xapple-icon-76x76.png.pagespeed.ic.gK0kUIH83N.webp",
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: "https://owlengine.com/favicon/xapple-icon-114x114.png.pagespeed.ic.-zRyWi8tD9.webp",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: "https://owlengine.com/favicon/xapple-icon-120x120.png.pagespeed.ic.Sr363jEZDt.webp",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: "https://owlengine.com/favicon/xapple-icon-144x144.png.pagespeed.ic.DVu4jmp4eM.webp",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: "https://owlengine.com/favicon/xapple-icon-152x152.png.pagespeed.ic.jM7y8dEa1P.webp",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "https://owlengine.com/favicon/xapple-icon-180x180.png.pagespeed.ic.r77hWIjgIY.webp",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "https://owlengine.com/favicon/xandroid-icon-192x192.png.pagespeed.ic.51NEzLw_4J.webp",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "https://owlengine.com/favicon/xfavicon-32x32.png.pagespeed.ic.Zkgvl1GXUs.webp",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: "https://owlengine.com/favicon/xfavicon-96x96.png.pagespeed.ic.5GDG6iCbUk.webp",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "https://owlengine.com/favicon/xfavicon-16x16.png.pagespeed.ic.5uoasXZCmt.webp",
    },
    { rel: "manifest", href: "https://owlengine.com/favicon/manifest.json" },
  ],
  meta: [
    { name: "msapplication-TileColor", content: "#ffffff" },
    {
      name: "msapplication-TileImage",
      content: "https://owlengine.com/favicon/ms-icon-144x144.png",
    },
    { name: "theme-color", content: "#ffffff" },
    {
      name: "description",
      content:
        "Situs web yang menyediakan layanan API untuk pengembang dan perusahaan, seperti Geolokasi IP, User Agent, dan Ekstraksi dari Gambar maupun Situs.",
    },
    {
      name: "keywords",
      content:
        "IP Geolokasi, Ekstraksi Agen Pengguna, Ekstraksi Teks, Peringkasan Teks, Parafrase Teks, Penulis Ulang Teks, Pengenalan Karakter Optik, Ekstraksi Gambar, Ekstraksi Web, Pengikisan Web, Alamat IP",
    },

    {
      property: "og:description",
      content:
        "Situs web yang menyediakan layanan API untuk pengembang dan perusahaan, seperti Geolokasi IP, User Agent, dan Ekstraksi dari Gambar maupun Situs.",
    },
    { property: "og:title", content: "Beranda | The Owl Engine" },
    { property: "og:site_name", content: "The Owl Engine" },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "id-ID" },
    { property: "og:url", content: "https://owlengine.com" },
    {
      property: "og:image",
      content:
        "https://owlengine.com/storage/Rf3Sl1Y5WftHEQovX0E8EMyydw8cA0-metaUGFnZSBIb21lIC0gRW5nbGlzaC5wbmc=-.png",
    },

    { name: "twitter:card", content: "website" },
    { name: "twitter:title", content: "Beranda | The Owl Engine" },
    { name: "twitter:site", content: "The Owl Engine" },
    {
      name: "twitter:description",
      content:
        "Situs web yang menyediakan layanan API untuk pengembang dan perusahaan, seperti Geolokasi IP, User Agent, dan Ekstraksi dari Gambar maupun Situs.",
    },
    { name: "twitter:url", content: "https://owlengine.com" },
    {
      name: "twitter:image",
      content:
        "https://owlengine.com/storage/Rf3Sl1Y5WftHEQovX0E8EMyydw8cA0-metaUGFnZSBIb21lIC0gRW5nbGlzaC5wbmc=-.png",
    },
  ],
};
