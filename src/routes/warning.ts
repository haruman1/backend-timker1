import { Elysia, t } from 'elysia';
import { query } from '../../mysql.config';

export const warningRoutes = new Elysia({ prefix: '/warning' })
  .get(
    '/all',
    async ({ set, status: setStatus, headers }) => {
      const apiKey = headers['x-api-key'];

      if (apiKey !== process.env.WEBHOOK_KEY) {
        return setStatus(401, {
          success: false,
          message: 'Unauthorized access',
        });
      }
      const data = await query(`
      SELECT
        id,
        lokasi,
        nama_pasien,
        kategori_penyakit,
        status_pasien,
        usia,
        hasil_antigen,
        pemeriksaan_lab,
        tindak_ambulan,
        tujuan_rumah_sakit,
        created_at as tanggal,
        CASE
          WHEN kategori_penyakit = 'Menular'
               AND hasil_antigen = 'Positif'
            THEN 'CRITICAL'
          WHEN status_pasien = 'Gawat Darurat'
            THEN 'CRITICAL'
          WHEN kategori_penyakit = 'Menular'
               AND usia >= 60
            THEN 'HIGH'
          WHEN pemeriksaan_lab = 'Pending'
            THEN 'MEDIUM'
          ELSE 'LOW'
        END AS severity,
        CASE
          WHEN tujuan_rumah_sakit IS NOT NULL
            THEN 'RESOLVED'
          WHEN tindak_ambulan IS NOT NULL
            THEN 'IN PROGRESS'
          ELSE 'ACTIVE'
        END AS alert_status
      FROM pasien_ambulan
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
      LIMIT 20
    `);

      if (data.length === 0) {
        return {
          success: true,
          message: 'No warnings found',
          data: [],
        };
      }

      return {
        success: true,
        message: 'Warnings retrieved successfully',
        data: data,
      };
    },
    {
      headers: t.Object({
        'x-api-key': t.String(),
      }),
    }
  )
  .post(
    '/add',
    async ({ body, set, status, headers }) => {
      const apiKey = headers['x-api-key'];

      if (apiKey !== process.env.WEBHOOK_KEY) {
        return status(401, {
          success: false,
          message: 'Unauthorized access',
        });
      }
      try {
        const {
          tanggal,
          jam,
          nama,
          usia,
          jenisKelamin,
          status,
          noPenerbangan,
          instansi,
          anamnesa,
          diagnosa,
          tujuan,
          rsTujuan,
          noAmbulance,
          noBilling,
          totalBayar,
          tanggalBayar,
          petugas,
        } = body;
        const results = await query(
          'INSERT INTO ambulan (tanggal, jam, nama, usia, jenis_kelamin, status, no_penerbangan, instansi, anamnesa, diagnosa, tujuan, rs_tujuan, no_ambulance, no_billing, total_bayar, tanggal_bayar, petugas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            tanggal,
            jam,
            nama,
            usia,
            jenisKelamin,
            status,
            noPenerbangan,
            instansi,
            anamnesa,
            diagnosa,
            tujuan,
            rsTujuan,
            noAmbulance,
            noBilling,
            totalBayar,
            tanggalBayar,
            petugas,
          ]
        );
        if (results.affectedRows === 0) {
          return {
            success: false,
            message: 'Gagal menambahkan ambulan',
          };
        }

        return {
          success: true,
          message: 'Ambulan berhasil ditambahkan',
        };
      } catch (error) {
        return status(500, {
          success: false,
          message: 'Internal server error',
        });
      }
    },
    {
      headers: t.Object({ 'x-api-key': t.String() }),
      body: t.Object({
        tanggal: t.String(),
        jam: t.String(),
        nama: t.String(),
        usia: t.Number(),
        jenisKelamin: t.String(),
        status: t.String(),
        noPenerbangan: t.String(),
        instansi: t.String(),
        anamnesa: t.String(),
        diagnosa: t.String(),
        tujuan: t.String(),
        rsTujuan: t.String(),
        noAmbulance: t.String(),
        noBilling: t.String(),
        totalBayar: t.Number(),
        tanggalBayar: t.String(),
        petugas: t.String(),
      }),
    }
  )
  .patch(
    'edit/:id',
    async ({ params, body, set, status, headers }) => {
      const apiKey = headers['x-api-key'];
      if (apiKey !== process.env.WEBHOOK_KEY) {
        return status(401, {
          success: false,
          message: 'Unauthorized access',
        });
      }
      try {
        const { id } = params;
        const {
          tanggal,
          jam,
          nama,
          usia,
          jenisKelamin,
          status,
          noPenerbangan,
          instansi,
          anamnesa,
          diagnosa,
          tujuan,
          rsTujuan,
          noAmbulance,
          noBilling,
          totalBayar,
          tanggalBayar,
          petugas,
        } = body;
        await query(
          `UPDATE ambulan SET tanggal = ?, jam = ?, nama = ?, usia = ?, jenis_kelamin = ?, status = ?, no_penerbangan = ?, instansi = ?, anamnesa = ?, diagnosa = ?, tujuan = ?, rs_tujuan = ?, no_ambulance = ?, no_billing = ?, total_bayar = ?, tanggal_bayar = ?, petugas = ? WHERE id = ?`,
          [
            tanggal,
            jam,
            nama,
            usia,
            jenisKelamin,
            status,
            noPenerbangan,
            instansi,
            anamnesa,
            diagnosa,
            tujuan,
            rsTujuan,
            noAmbulance,
            noBilling,
            totalBayar,
            tanggalBayar,
            petugas,
            id,
          ]
        );
      } catch (error) {
        return status(500, {
          success: false,
          message: 'Internal server error',
        });
      }
    },
    {
      headers: t.Object({ 'x-api-key': t.String() }),
      params: t.Object({
        id: t.Number(),
      }),
      body: t.Object({
        tanggal: t.String(),
        jam: t.String(),
        nama: t.String(),
        usia: t.Number(),
        jenisKelamin: t.String(),
        status: t.String(),
        noPenerbangan: t.String(),
        instansi: t.String(),
        anamnesa: t.String(),
        diagnosa: t.String(),
        tujuan: t.String(),
        rsTujuan: t.String(),
        noAmbulance: t.String(),
        noBilling: t.String(),
        totalBayar: t.Number(),
        tanggalBayar: t.String(),
        petugas: t.String(),
      }),
    }
  )
  .patch(
    'delete/:id',
    async ({ params, set, status, headers }) => {
      const apiKey = headers['x-api-key'];
      if (apiKey !== process.env.WEBHOOK_KEY) {
        return status(401, {
          success: false,
          message: 'Unauthorized access',
        });
      }
      try {
        const { id } = params;
        await query(`UPDATE ambulan SET deleted_at = ? WHERE id = ?`, [
          new Date(),
          id,
        ]);
        return {
          success: true,
          message: 'Ambulan berhasil dihapus',
        };
      } catch (error) {
        return status(500, {
          success: false,
          message: 'Internal server error',
        });
      }
    },
    {
      headers: t.Object({ 'x-api-key': t.String() }),
      params: t.Object({
        id: t.Number(),
      }),
    }
  )
  .get(
    'data/:from/:to',
    async ({ params, set, status, headers }) => {
      const apiKey = headers['x-api-key'];
      if (apiKey !== process.env.WEBHOOK_KEY) {
        return status(401, {
          success: false,
          message: 'Unauthorized access',
        });
      }
      try {
        const { from, to } = params;
        const results = await query(
          'SELECT * FROM ambulan WHERE deleted_at IS NULL AND tanggal BETWEEN ? AND ? ORDER BY id DESC',
          [from, to]
        );
        if (results.length === 0) {
          return {
            success: true,
            message: 'Tidak ada ambulan ditemukan',
            data: [],
          };
        }
        if (results.length > 0) {
          return {
            success: true,
            message: 'Success mengambil data ambulans',
            data: [
              ...results.map((item: any) => ({
                tanggal: item.tanggal,
                jam: item.jam,
                nama: item.nama,
                usia: item.usia,
                jenis_kelamin: item.jenis_kelamin,
                status: item.status,
                no_penerbangan: item.no_penerbangan,
                instansi: item.instansi,
                anamnesa: item.anamnesa,
                diagnosa: item.diagnosa,
                tujuan: item.tujuan,
                rs_tujuan: item.rs_tujuan,
                no_ambulance: item.no_ambulance,
                no_billing: item.no_billing,
                total_bayar: item.total_bayar,
                tanggal_bayar: item.tanggal_bayar,
                petugas: item.petugas,
              })),
            ],
          };
        }
      } catch (error) {
        return status(500, {
          success: false,
          message: 'Internal server error',
        });
      }
    },
    {
      headers: t.Object({ 'x-api-key': t.String() }),
      params: t.Object({
        from: t.String(),
        to: t.String(),
      }),
    }
  )
  .onError(({ code, error, set }) => {
    // Khusus validation error
    if (code === 'VALIDATION') {
      set.status = 422;

      return {
        success: false,
        message: 'Data yang dikirim tidak valid',
        detail: error.all.map((e) => ({
          error: e.summary,
        })),
      };
    }
  });
