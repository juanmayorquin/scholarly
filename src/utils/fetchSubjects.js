import axios from "axios";

const url = "http://localhost:3001/api/subjects"

export const fetchSubjects = () => axios.get(url)
