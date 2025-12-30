import { Elysia, t } from 'elysia';
import { query } from '../../mysql.config';

export const grafikRoutes = new Elysia({ prefix: '/grafik' })
  .group('/vaksinasi', (app) =>
    app.get(
      'data/:from/:to',
      async ({ headers, params }) => {
        const { from, to } = params;
        const apiKey = headers['x-api-key'];
        if (apiKey !== process.env.WEBHOOK_KEY) {
          return {
            success: false,
            message: 'Unauthorized Access',
          };
        }
        try {
          const result = await query(
            'SELECT DATE(created_at) AS tanggal, jenis_vaksin, COUNT(*) AS total FROM pasien_ambulan WHERE DATE(created_at) BETWEEN ? AND ? AND jenis_vaksin IS NOT NULL GROUP BY DATE(created_at), jenis_vaksin ORDER BY tanggal ASC;',
            [from, to]
          );
          if (result.length === 0) {
            return {
              success: true,
              message: 'Tidak ada data vaksinasi ditemukan',
              data: [],
            };
          }
          if (result.length > 0) {
            return {
              success: true,
              message: 'Success mengambil data vaksinasi',
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
        headers: t.Object({ 'x-api-key': t.String() }),
        params: t.Object({
          from: t.String(),
          to: t.String(),
        }),
      }
    )
  )
  .group('/penyakit', (app) =>
    app
      .get(
        'data/total/:from/:to',
        async ({ headers, params }) => {
          const apiKey = headers['x-api-key'];
          if (apiKey !== process.env.WEBHOOK_KEY) {
            return {
              success: false,
              message: 'Unauthorized Access',
            };
          }
          const { from, to } = params;
          try {
            const result = await query(
              'SELECT DATE(created_at) AS tanggal, kategori_penyakit, COUNT(*) AS total FROM pasien_ambulan WHERE DATE(created_at) BETWEEN ? AND ? GROUP BY DATE(created_at), kategori_penyakit ORDER BY tanggal ASC;',
              [from, to]
            );
            if (result.length === 0) {
              return {
                success: true,
                message: 'Tidak ada data penyakit ditemukan',
                data: [],
              };
            }
            if (result.length > 0) {
              return {
                success: true,
                message: 'Data Penyakit Ditemukan',
                data: result.map(
                  (item: {
                    tanggal: any;
                    kategori_penyakit: any;
                    total: any;
                  }) => ({
                    day: item.tanggal,
                    kategori_penyakit: item.kategori_penyakit,
                    total: item.total,
                  })
                ),
              };
            }
          } catch (error) {
            return {
              success: false,
              message: 'Terjadi kesalahan pada server',
            };
          }
          // const { from, to } = params;
        },
        {
          headers: t.Object({ 'x-api-key': t.String() }),
          params: t.Object({
            from: t.String(),
            to: t.String(),
          }),
        }
      )
      .get(
        'data/menular/:from/:to',
        async ({ headers, params }) => {
          const { from, to } = params;
          const apiKey = headers['x-api-key'];
          if (apiKey !== process.env.WEBHOOK_KEY) {
            return {
              success: false,
              message: 'Unauthorized Access',
            };
          }
          try {
            const result = await query(
              'SELECT DATE(created_at) AS tanggal, kategori_penyakit, COUNT(*) AS total FROM pasien_ambulan WHERE DATE(created_at) BETWEEN ? AND ? AND kategori_penyakit = ? GROUP BY DATE(created_at), kategori_penyakit ORDER BY tanggal ASC;',
              [from, to, 'Menular']
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
        },
        {
          headers: t.Object({
            'x-api-key': t.String(),
          }),
        }
      )
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
