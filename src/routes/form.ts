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
            `INSERT INTO pasien_ambulan (
  timestamp, lokasi, no_rme, tanggal, jam, nama_pasien,
  jenis_kelamin, usia, status_pasien, nik_paspor, alamat, no_telepon,
  tujuan_rumah_sakit_rujukan, petugas, nip_petugas,
  anamnesa, diagnosa, kategori_penyakit, kode_penyakit,
  dokumen_karantina, pemeriksaan_laboratorium, pemeriksaan_swab,
  hasil_antigen, jenis_vaksinasi, tindakan_ambulan
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
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
              body.tujuan_rumah_sakit_rujukan,
              body.petugas,
              body.nip_petugas,
              body.anamnesa,
              body.diagnosa,
              body.kategori_penyakit,
              body.kode_penyakit,
              body.dokumen_karantina,
              body.pemeriksaan_laboratorium,
              body.pemeriksaan_swab,
              body.hasil_antigen,
              body.jenis_vaksinasi,
              body.tindakan_ambulan,
            ]
          );
          return {
            success: true,
            message: 'Data berhasil disimpan',
            data: data,
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
          tujuan_rumah_sakit_rujukan: t.String(),
          petugas: t.String(),
          nip_petugas: t.String(),
          anamnesa: t.String(),
          diagnosa: t.String(),
          kategori_penyakit: t.String(),
          kode_penyakit: t.String(),
          dokumen_karantina: t.String(),
          pemeriksaan_laboratorium: t.String(),
          pemeriksaan_swab: t.String(),
          hasil_antigen: t.String(),
          jenis_vaksinasi: t.String(),
          tindakan_ambulan: t.String(),
        }),
        headers: t.Object({ 'x-api-key': t.String() }),
      }
    )
);
