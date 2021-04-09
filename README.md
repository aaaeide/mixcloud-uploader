# mixcloud-uploader

A simple tool to simplify the process of uploading Radio Revolt programs with music to MixCloud.

PoC. Todo:

- [x] Fetch rundown information for one or more studio bookings via the Radio Revolt REST API
- [x] Generate tracklist according to the MixCloud API spec
- [x] User should be able to easily unreflect promo pause (30th minute) from tracklist
- [x] Add show name, picture, description and ~~mp3 file~~ URL to audio file from the Radio Revolt OnDemand URL api
- [ ] Generate HTTP POST according to MC spec
- [ ] Setup MixCloud Auth
- [ ] Actually publish the thing
- [ ] (maybe) Add setting for filtering promo bookings from booking selection dropdown

## See also:

- MixCloud API documentation: https://www.mixcloud.com/developers/
- Radio Revolt API documentation (private): https://github.com/Studentmediene/radio-rest-api
