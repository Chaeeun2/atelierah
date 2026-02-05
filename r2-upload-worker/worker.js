// Cloudflare Worker for R2 Upload
// 이 파일을 Cloudflare Workers에 배포하세요

export default {
  async fetch(request, env) {
    // CORS 헤더
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Preflight 요청 처리
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // 업로드 엔드포인트
    if (url.pathname === '/upload' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const file = formData.get('file');
        const folder = formData.get('folder') || 'uploads';

        if (!file) {
          return new Response(JSON.stringify({ error: '파일이 없습니다' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // 파일명 생성
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        const extension = file.name.split('.').pop().toLowerCase();
        const fileName = `${folder}/${timestamp}-${random}.${extension}`;

        // R2에 업로드
        await env.R2_BUCKET.put(fileName, file.stream(), {
          httpMetadata: {
            contentType: file.type,
          },
        });

        // Public URL 반환
        const publicUrl = `${env.R2_PUBLIC_URL}/${fileName}`;

        return new Response(JSON.stringify({ 
          success: true, 
          url: publicUrl,
          fileName: fileName 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // 삭제 엔드포인트
    if (url.pathname === '/delete' && request.method === 'POST') {
      try {
        const { fileName } = await request.json();
        
        if (!fileName) {
          return new Response(JSON.stringify({ error: '파일명이 없습니다' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        await env.R2_BUCKET.delete(fileName);

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};



