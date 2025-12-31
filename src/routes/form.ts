import { Elysia, t } from 'elysia';
import { query } from '../../mysql.config';

export const formRoutes = new Elysia({ prefix: '/form' }).group(
  '/sheet',
  (app) =>
    app.post(
      '/timker1',
      async ({ body, headers, set }) => {
        const apiKey = headers['x-api-key'];
        if (apiKey !== process.env.WEBHOOK_KEY) {
          return {
            success: false,
            message: 'Unauthorized access',
          };
        }
        try {
          const data = await query(
            `INSERT INTO form_responses_ambulan (
          timestamp,
          lokasi,
          no_rme,
          tanggal,
          jam,
          nama_pasien,
          jenis_kelamin,
          usia,
          status_pasien,
          nik_paspor,
          alamat,
          no_telpon,
          anamnesa,
          diagnosa,
          kategori_penyakit,
          kode_penyakit,
          dokumen_karantina
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              body.timestamp,
              body.lokasi,
              body.no_rme,
              body.tanggal,
              body.jam,
              body.nama_pasien,
              body.jenis_kelamin,
              body.usia,
              body.status_pasien,
              body.nik_paspor,
              body.alamat,
              body.no_telpon,
              body.anamnesa,
              body.diagnosa,
              body.kategori_penyakit,
              body.kode_penyakit,
              body.dokumen_karantina,
            ]
          );
          return {
            success: true,
            message: 'Data berhasil disimpan',
            data,
          };
        } catch (error) {
          return {
            success: false,
            message: 'Terjadi kesalahan',
            error,
          };
        }
      },
      {
        body: t.Object({
          timestamp: t.String(),
          lokasi: t.String(),
          no_rme: t.String(),
          tanggal: t.String(),
          jam: t.String(),
          nama_pasien: t.String(),
          jenis_kelamin: t.String(),
          usia: t.Number(),
          status_pasien: t.String(),
          nik_paspor: t.String(),
          alamat: t.String(),
          no_telpon: t.String(),
          anamnesa: t.String(),
          diagnosa: t.String(),
          kategori_penyakit: t.String(),
          kode_penyakit: t.String(),
          dokumen_karantina: t.String(),
        }),
      }
    )
);
