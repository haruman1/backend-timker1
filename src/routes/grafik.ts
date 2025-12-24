import { Elysia, t } from 'elysia';
import { query } from '../../mysql.config';

export const grafikRoutes = new Elysia({ prefix: '/grafik' }).group(
  '/penyakit',
  (app) =>
    app
      .get('data/menular', async ({ headers }) => {
        const apiKey = headers['x-api-key'];
        if (apiKey !== process.env.WEBHOOK_KEY) {
          return {
            success: false,
            message: 'Unauthorized Access',
          };
        }
        try {
          const result = await query(
            'SELECT kategori_penyakit, COUNT(*) as total FROM pasien_ambulan WHERE kategori_penyakit = ? GROUP BY kategori_penyakit',
            ['Menular']
          );
          if (result.length === 0) {
            return {
              success: true,
              message: 'Tidak ada penyakit menular ditemukan',
              data: [],
            };
          }
          if (result.length > 0) {
            return {
              success: true,
              message: 'Data Penyakit Menular Ditemukan',
              data: result,
            };
          }
        } catch (error) {
          return {
            success: false,
            message: 'Terjadi kesalahan pada server',
          };
        }
      })
      .get(
        'data/pemeriksaan-labs/:nama-test',
        async ({ headers, params }) => {
          const { nama_test } = params;
          const apiKey = headers['x-api-key'];
          if (apiKey !== process.env.WEBHOOK_KEY) {
            return {
              success: false,
              message: 'Unauthorized Access',
            };
          }
          try {
            const result = await query(
              'SELECT pemeriksaan_lab, COUNT(*) as total FROM pasien_ambulan WHERE pemeriksaan_lab = ? GROUP BY pemeriksaan_lab',
              [nama_test]
            );
            if (result.length === 0) {
              return {
                success: true,
                message: `Tidak ada pemeriksaan lab dengan nama ${nama_test} ditemukan`,
                data: [],
              };
            }
            if (result.length > 0) {
              return {
                success: true,
                message: `Data Pemeriksaan Lab dengan nama ${nama_test} Ditemukan`,
                data: result,
              };
            }
          } catch (error) {
            return {
              success: false,
              message: 'Terjadi kesalahan pada server',
            };
          }
        },
        {
          headers: t.Object({
            'x-api-key': t.String(),
          }),
          params: t.Object({
            nama_test: t.String(),
          }),
        }
      )
      .get(
        'data/tidak-menular',
        async ({ headers }) => {
          const apiKey = headers['x-api-key'];
          if (apiKey !== process.env.WEBHOOK_KEY) {
            return {
              success: false,
              message: 'Unauthorized Access',
            };
          }
          try {
            const result = await query(
              'SELECT kategori_penyakit, COUNT(*) as total FROM pasien_ambulan WHERE kategori_penyakit = ? GROUP BY kategori_penyakit',
              ['Tidak Menular']
            );
            if (result.length === 0) {
              return {
                success: true,
                message: 'Tidak ada ambulan ditemukan',
                data: [],
              };
            }
            if (result.length > 0) {
              return {
                success: true,
                message: 'Data Penyakit Tidak Menular Ditemukan',
                data: result,
              };
            }
          } catch (error) {
            return {
              success: false,
              message: 'Terjadi kesalahan pada server',
            };
          }
        },
        {
          headers: t.Object({
            'x-api-key': t.String(),
          }),
        }
      )
      .get('data/top-5', async () => {
        const result = await query(
          'SELECT kategori_penyakit, COUNT(*) as total FROM pasien_ambulan GROUP BY kategori_penyakit ORDER BY total DESC LIMIT 5'
        );
        return result;
      })
);
