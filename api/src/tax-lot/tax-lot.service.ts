import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DbType, DB } from 'src/global/providers/db.provider';
import { SelectTaxLot, taxLot } from 'src/schema/tax-lot';

@Injectable()
export class TaxLotService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  // Limit results to 2 to avoid crashing application
  async getAll(): Promise<Array<Partial<SelectTaxLot>>> {
    const result = await this.db
      .select({
        bbl: taxLot.bbl,
        boroughCode: taxLot.boroughCode,
        block: taxLot.block,
        lot: taxLot.lot,
        address: taxLot.address,
        buildingClass: taxLot.buildingClass,
        landUseCode: taxLot.landUseCode,
        commercialArea: taxLot.commercialArea,
        residentialArea: taxLot.residentialArea,
        officeArea: taxLot.officeArea,
        retailArea: taxLot.residentialArea,
        garageArea: taxLot.garageArea,
        storageArea: taxLot.storageArea,
        factoryArea: taxLot.factoryArea,
        otherArea: taxLot.otherArea,
        floors: taxLot.floors,
        residentialUnits: taxLot.residentialUnits,
        totalUnits: taxLot.totalUnits,
        lotType: taxLot.lotType,
        landmark: taxLot.landmark,
        builtFAR: taxLot.builtFAR,
        residentialFAR: taxLot.residentialFAR,
        commercialFAR: taxLot.commercialFAR,
        facilityFAR: taxLot.facilityFAR,
      })
      .from(taxLot)
      .limit(2);
    return result;
  }

  async getById(bbl: string): Promise<Partial<SelectTaxLot>> {
    const result = await this.db
      .select({
        bbl: taxLot.bbl,
        boroughCode: taxLot.boroughCode,
        block: taxLot.block,
        lot: taxLot.lot,
        address: taxLot.address,
        buildingClass: taxLot.buildingClass,
        landUseCode: taxLot.landUseCode,
        commercialArea: taxLot.commercialArea,
        residentialArea: taxLot.residentialArea,
        officeArea: taxLot.officeArea,
        retailArea: taxLot.residentialArea,
        garageArea: taxLot.garageArea,
        storageArea: taxLot.storageArea,
        factoryArea: taxLot.factoryArea,
        otherArea: taxLot.otherArea,
        floors: taxLot.floors,
        residentialUnits: taxLot.residentialUnits,
        totalUnits: taxLot.totalUnits,
        lotType: taxLot.lotType,
        landmark: taxLot.landmark,
        builtFAR: taxLot.builtFAR,
        residentialFAR: taxLot.residentialFAR,
        commercialFAR: taxLot.commercialFAR,
        facilityFAR: taxLot.facilityFAR,
      })
      .from(taxLot)
      .where(eq(taxLot.bbl, bbl));
    return result[0];
  }
}
