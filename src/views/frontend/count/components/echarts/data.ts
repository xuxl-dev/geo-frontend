import { computed, ref } from "vue";
import { addCountData, getCountData } from "@/api/echartsData/countData"
import { number, string } from "vue-types";
import { getDataType } from "vue-json-pretty/types/utils";

const form = ref({
    pagenum: '2',
    pagesize: '5'
})

const datetime = ref([''])
const total = ref([0])
const employees = ref([0])
const foreignPersonnel = ref([0])

let num = 16

const DForm = ref({
    date: '',
    total: 0,
    employees: 0,
    foreignPersonnel: 0,
})

function randomDF() {
    DForm.value.employees = Math.round(Math.random() * 100)
    DForm.value.foreignPersonnel = Math.round(Math.random() * 10)
    DForm.value.total = DForm.value.employees + DForm.value.foreignPersonnel
    DForm.value.date = '2023-11-' + num.toString()
}

export function addData() {
    randomDF()
    num++
    addCountData(DForm)
}

export async function getData() {
    const startNumber = 0

    const data = await getCountData(form)

    for (let i = startNumber; i < data.length; i++) {
        datetime.value.push(data[i].date)
        total.value.push(data[i].total)
        employees.value.push(data[i].employees)
        foreignPersonnel.value.push(data[i].foreignPersonnel)
    }



}

export { datetime, total, employees, foreignPersonnel }