# Cmv3 Frontend

[Demo](https://cm.alby.software/)

![image](https://raw.githubusercontent.com/0xalby/cmv3-frontend/main/example.png)

(This project currently only supports the following guards
`solPayment` `allowList`, `startDate` `endDate`)

This is a demo project for the [use-cmv3](https://github.com/0xalby/use-cmv3) library

## Quick Start

```bash
git clone https://github.com/0xalby/cmv3-frontend.git frontend
```
```bash
cd frontend
```
Install dependencies 
```bash
npm install
```
Update the `.env.example` values with your own, and rename to `.env`
```
NEXT_PUBLIC_CANDY_MACHINE_ID={your_cm_id}
NEXT_PUBLIC_CANDY_MACHINE_LUT={your_cm_lut}
NEXT_PUBLIC_ENDPOINT={your_endpoint}
```
Start
```bash
npm run dev
```
