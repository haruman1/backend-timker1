import { Elysia, t } from 'elysia';
import { query } from '../../mysql.config';

export const grafikRoutes = new Elysia({ prefix: '/grafik' })
  .get('/diagnosa', async () => {
    const result = await query(
      'SELECT DIAGNOSA, DATE(created_at) AS tanggal, COUNT(*) AS total FROM pasien_ambulan = ? GROUP BY DATE(created_at) ORDER BY tanggal ASC'
    );
    return result;
  })
  .group('/vaksinasi', (app) =>
    app
      .get(
        '/meningitis-meningococcus',
        async ({ headers }) => {
          const apiKey = headers['x-api-key'];
          if (apiKey !== process.env.WEBHOOK_KEY) {
            return {
              success: false,
              message: 'Unauthorized Access',
            };
          }
          const result = await query(
            'SELECT jenis_vaksinasi, COUNT(*) AS total FROM pasien_ambulan WHERE jenis_vaksinasi = ? GROUP BY jenis_vaksinasi',
            ['meningitis-meningococcus']
          );
          if (result.length === 0) {
            return {
              success: true,
              message:
                'Tidak ada data vaksinasi meningitis-meningococcus ditemukan',
              data: [],
            };
          }
          if (result.length > 0) {
            return {
              success: true,
              message: 'Data Vaksinasi Meningitis-Meningococcus Ditemukan',
              data: result,
            };
          }
        },
        {
          headers: t.Object({ 'x-api-key': t.String() }),
        }
      )
      .get('yellow-fever', async ({ headers }) => {
        const apiKey = headers['x-api-key'];
        if (apiKey !== process.env.WEBHOOK_KEY) {
          return {
            success: false,
            message: 'Unauthorized Access',
          };
        }
        const result = await query(
          'SELECT jenis_vaksinasi, COUNT(*) AS total FROM pasien_ambulan WHERE jenis_vaksinasi = ? GROUP BY jenis_vaksinasi',
          ['yellow-fever']
        );
        if (result.length === 0) {
          return {
            success: true,
            message: 'Tidak ada data vaksinasi yellow fever ditemukan',
            data: [],
          };
        }
        if (result.length > 0) {
          return {
            success: true,
            message: 'Data Vaksinasi Yellow Fever Ditemukan',
            data: result,
          };
        }
      })
      .get('/polio', async ({ headers }) => {
        const apiKey = headers['x-api-key'];
        if (apiKey !== process.env.WEBHOOK_KEY) {
          return {
            success: false,
            message: 'Unauthorized Access',
          };
        }
        const result = await query(
          'SELECT jenis_vaksinasi, COUNT(*) AS total FROM pasien_ambulan WHERE jenis_vaksinasi = ? GROUP BY jenis_vaksinasi',
          ['polio']
        );
        if (result.length === 0) {
          return {
            success: true,
            message: 'Tidak ada data vaksinasi polio ditemukan',
            data: [],
          };
        }
        if (result.length > 0) {
          return {
            success: true,
            message: 'Data Vaksinasi Polio Ditemukan',
            data: result,
          };
        }
      })
      .get('/influenza', async ({ headers }) => {
        const apiKey = headers['x-api-key'];
        if (apiKey !== process.env.WEBHOOK_KEY) {
          return {
            success: false,
            message: 'Unauthorized Access',
          };
        }
        const result = await query(
          'SELECT jenis_vaksinasi, COUNT(*) AS total FROM pasien_ambulan WHERE jenis_vaksinasi = ? GROUP BY jenis_vaksinasi',
          ['influenza']
        );
        if (result.length === 0) {
          return {
            success: true,
            message: 'Tidak ada data vaksinasi influenza ditemukan',
            data: [],
          };
        }
        if (result.length > 0) {
          return {
            success: true,
            message: 'Data Vaksinasi Influenza Ditemukan',
            data: result,
          };
        }
      })
  )

  .group('/laboratorium', (app) =>
    app
      .get(
        '/gds',
        async ({ headers }) => {
          const apiKey = headers['x-api-key'];
          if (apiKey !== process.env.WEBHOOK_KEY) {
            return {
              success: false,
              message: 'Unauthorized Access',
            };
          }
          const result = await query(
            'SELECT pemeriksaan_lab, COUNT(*) AS total FROM pasien_ambulan WHERE pemeriksaan_lab = ? GROUP BY pemeriksaan_lab',
            ['GDS']
          );
          if (result.length === 0) {
            return {
              success: true,
              message: 'Tidak ada data GDS ditemukan',
              data: [],
            };
          }
          if (result.length > 0) {
            return {
              success: true,
              message: 'Data GDS Ditemukan',
              data: result,
            };
          }
        },
        {
          headers: t.Object({ 'x-api-key': t.String() }),
        }
      )
      .get(
        '/HB',
        async ({ headers }) => {
          const apiKey = headers['x-api-key'];
          if (apiKey !== process.env.WEBHOOK_KEY) {
            return {
              success: false,
              message: 'Unauthorized Access',
            };
          }
          const result = await query(
            'SELECT pemeriksaan_lab, COUNT(*) AS total FROM pasien_ambulan WHERE pemeriksaan_lab = ? GROUP BY pemeriksaan_lab',
            ['HB']
          );
          if (result.length === 0) {
            return {
              success: true,
              message: 'Tidak ada data HB ditemukan',
              data: [],
            };
          }
          if (result.length > 0) {
            return {
              success: true,
              message: 'Data HB Ditemukan',
              data: result,
            };
          }
        },
        {
          headers: t.Object({ 'x-api-key': t.String() }),
        }
      )
      .get(
        '/cholesterol',
        async ({ headers }) => {
          const apiKey = headers['x-api-key'];
          if (apiKey !== process.env.WEBHOOK_KEY) {
            return {
              success: false,
              message: 'Unauthorized Access',
            };
          }
          const result = await query(
            'SELECT pemeriksaan_lab, COUNT(*) AS total FROM pasien_ambulan WHERE pemeriksaan_lab = ? GROUP BY pemeriksaan_lab',
            ['Cholesterol']
          );
          if (result.length === 0) {
            return {
              success: true,
              message: 'Tidak ada data Cholesterol ditemukan',
              data: [],
            };
          }
          if (result.length > 0) {
            return {
              success: true,
              message: 'Data Cholesterol Ditemukan',
              data: result,
            };
          }
        },
        {
          headers: t.Object({ 'x-api-key': t.String() }),
        }
      )
      .get(
        '/asam-urat',
        async ({ headers }) => {
          const apiKey = headers['x-api-key'];
          if (apiKey !== process.env.WEBHOOK_KEY) {
            return {
              success: false,
              message: 'Unauthorized Access',
            };
          }
          const result = await query(
            'SELECT pemeriksaan_lab, COUNT(*) AS total FROM pasien_ambulan WHERE pemeriksaan_lab = ? GROUP BY pemeriksaan_lab',
            ['Asam Urat']
          );
          if (result.length === 0) {
            return {
              success: true,
              message: 'Tidak ada data Asam Urat ditemukan',
              data: [],
            };
          }
          if (result.length > 0) {
            return {
              success: true,
              message: 'Data Asam Urat Ditemukan',
              data: result,
            };
          }
        },
        {
          headers: t.Object({ 'x-api-key': t.String() }),
        }
      )
      .get(
        '/test-kehamilan',
        async ({ headers }) => {
          const apiKey = headers['x-api-key'];
          if (apiKey !== process.env.WEBHOOK_KEY) {
            return {
              success: false,
              message: 'Unauthorized Access',
            };
          }
          const result = await query(
            'SELECT pemeriksaan_lab, COUNT(*) AS total FROM pasien_ambulan WHERE pemeriksaan_lab = ? GROUP BY pemeriksaan_lab',
            ['Test Kehamilan']
          );
          if (result.length === 0) {
            return {
              success: true,
              message: 'Tidak ada data Test Kehamilan ditemukan',
              data: [],
            };
          }
          if (result.length > 0) {
            return {
              success: true,
              message: 'Data Test Kehamilan Ditemukan',
              data: result,
            };
          }
        },
        {
          headers: t.Object({ 'x-api-key': t.String() }),
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
