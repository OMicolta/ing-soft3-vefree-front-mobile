const base = "http://192.168.0.100:8090/";

export const urls = {
  createService: `${base}services/create`,
  acceptService: `${base}services/acceptService`,
  canceService: `${base}services/cancelService`,
  getAllServices: `${base}services/getAll`,
  getServicesByUser: `${base}services/getByUserId?userId=`,
  getVehicleTypes: `${base}vehicleType/getAll`,
};
