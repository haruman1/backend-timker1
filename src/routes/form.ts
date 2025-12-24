import { Elysia, t } from 'elysia';
import { query } from '../../mysql.config';

export const formRoutes = new Elysia({ prefix: '/form' }).group(
  '/sheet',
  (app) =>
    app.post(
      '/data',
      async ({ headers, body }) => {
        const apiKey = headers['x-api-key'];
        if (apiKey !== process.env.WEBHOOK_KEY) {
          return {
            success: false,
            message: 'Unauthorized Access',
          };
        }

        try {
          await query(
            `INSERT INTO pasien_ambulan (
          lokasi, no_rme, tanggal, jam,
          nama_pasien, jenis_kelamin, usia,
          status_pasien, anamnesa, diagnosa,
          tindak_ambulan, nik_paspor, alamat,
          no_hp, kategori_penyakit, kode_penyakit,
          pemeriksaan_lab, pemeriksaan_swab,
          jenis, petugas, nip_petugas
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              body.lokasi,
              body.no_rme,
              body.tanggal,
              body.jam,
              body.nama_pasien,
              body.jenis_kelamin,
              body.usia,
              body.status_pasien,
              body.anamnesa,
              body.diagnosa,
              body.tindak_ambulan,
              body.nik_paspor,
              body.alamat,
              body.no_hp,
              body.kategori_penyakit,
              body.kode_penyakit,
              body.pemeriksaan_lab,
              body.pemeriksaan_swab,
              body.jenis,
              body.petugas,
              body.nip_petugas,
            ]
          );

          return {
            success: true,
            message: 'Data pasien ambulan berhasil ditambahkan',
          };
        } catch (error) {
          console.error(error);
          return {
            success: false,
            message: 'Internal server error',
          };
        }
      },
      {
        headers: t.Object({
          'x-api-key': t.String(),
        }),
        body: t.Object({
          lokasi: t.String(),
          no_rme: t.String(),
          tanggal: t.String(),
          jam: t.String(),
          nama_pasien: t.String(),
          jenis_kelamin: t.String(),
          usia: t.Optional(t.Number()),
          status_pasien: t.String(),
          anamnesa: t.String(),
          diagnosa: t.String(),
          tindak_ambulan: t.String(),
          nik_paspor: t.String(),
          alamat: t.String(),
          no_hp: t.String(),
          kategori_penyakit: t.String(),
          kode_penyakit: t.String(),
          pemeriksaan_lab: t.String(),
          pemeriksaan_swab: t.String(),
          jenis: t.String(),
          petugas: t.String(),
          nip_petugas: t.String(),
        }),
      }
    )
);
